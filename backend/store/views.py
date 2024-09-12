from django.shortcuts import render
from store.models import Product, Category, Cart
from store.serializers import ProductSerializer, CategorySerializer, CartSerializer
from userauths.models import User
from decimal import Decimal
from rest_framework import generics
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView


from .models import CartOrder, CartOrderItem, Cart
from .serializers import CartOrderSerializer


class CategoryListAPIView(generics.ListAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [AllowAny]

class ProductListAPIView(generics.ListAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [AllowAny]

class ProductDetailAPIView(generics.RetrieveAPIView):
    serializer_class = ProductSerializer
    permission_classes = [AllowAny]

    def get_object(self):
        slug = self.kwargs['slug']
        return Product.objects.get(slug=slug)

class CartAPIView(generics.ListCreateAPIView):
    queryset = Cart.objects.all()
    serializer_class = CartSerializer
    permission_classes = [AllowAny]

    def create(self, request, *args, **kwargs):
        payload = request.data

        product_id = payload.get('product_id')
        user_id = payload.get('user_id')
        qty = payload.get('qty')
        price = payload.get('price')
        cart_id = payload.get('cart_id')

        # Retrieve the product instance
        product = Product.objects.get(id=product_id)
        
        # Retrieve the user instance (if provided)
        user = User.objects.get(id=user_id) if user_id and user_id != 'undefined' else None

        # Check if the cart already exists
        cart = Cart.objects.filter(cart_id=cart_id, product=product).first()

        if cart:
            cart.qty = qty
            cart.price = price
            cart.total = Decimal(price) * int(qty)
            cart.save()
            return Response({'message': 'Cart Updated Successfully'}, status=status.HTTP_200_OK)
        else:
            cart = Cart(
                product=product,
                user=user,
                qty=qty,
                price=price,
                total=Decimal(price) * int(qty),
                cart_id=cart_id
            )
            cart.save()
            return Response({'message': 'Cart Created Successfully'}, status=status.HTTP_201_CREATED)
        

class CartListView(generics.ListAPIView):
    serializer_class = CartSerializer
    permission_classes = [AllowAny]
    queryset = Cart.objects.all()

    def get_queryset(self):
        cart_id = self.kwargs['cart_id']
        user_id = self.kwargs.get('user_id')

        if user_id is not None:
            user = User.objects.get(id=user_id)
            queryset = Cart.objects.filter(user=user, cart_id=cart_id)
        else:
            queryset = Cart.objects.filter(cart_id=cart_id)

        return queryset
class CartTotalView(generics.ListAPIView):
    serializer_class = CartSerializer
    permission_classes = (AllowAny,)

    def get_queryset(self):
        cart_id = self.kwargs['cart_id']
        user_id = self.kwargs.get('user_id')  # Use get() method to handle the case where user_id is not present

        
        if user_id is not None:
            user = User.objects.get(id=user_id)
            queryset = Cart.objects.filter(cart_id=cart_id, user=user)
        else:
            queryset = Cart.objects.filter(cart_id=cart_id)
        
        return queryset
    

class CartDetailView(generics.RetrieveAPIView):
    # Define the serializer class for the view
    serializer_class = CartSerializer
    # Specify the lookup field for retrieving objects using 'cart_id'
    lookup_field = 'cart_id'

    # Add a permission class for the view
    permission_classes = (AllowAny,)


    def get_queryset(self):
        # Get 'cart_id' and 'user_id' from the URL kwargs
        cart_id = self.kwargs['cart_id']
        user_id = self.kwargs.get('user_id')  # Use get() to handle cases where 'user_id' is not present

        if user_id is not None:
            # If 'user_id' is provided, filter the queryset by both 'cart_id' and 'user_id'
            user = User.objects.get(id=user_id)
            queryset = Cart.objects.filter(cart_id=cart_id, user=user)
        else:
            # If 'user_id' is not provided, filter the queryset by 'cart_id' only
            queryset = Cart.objects.filter(cart_id=cart_id)

        return queryset

    def get(self, request, *args, **kwargs):
        # Get the queryset of cart items based on 'cart_id' and 'user_id' (if provided)
        queryset = self.get_queryset()

        # Initialize sums for various cart item attributes
        # total_shipping = 0.0
        # total_tax = 0.0
        # total_service_fee = 0.0
        total_sub_total = 0.0
        total_total = 0.0

        # Iterate over the queryset of cart items to calculate cumulative sums
        for cart_item in queryset:
            # Calculate the cumulative shipping, tax, service_fee, and total values
            # total_shipping += float(self.calculate_shipping(cart_item))
            # total_tax += float(self.calculate_tax(cart_item))
            # total_service_fee += float(self.calculate_service_fee(cart_item))
            total_sub_total += float(self.calculate_sub_total(cart_item))
            total_total += round(float(self.calculate_total(cart_item)), 2)

        # Create a data dictionary to store the cumulative values
        data = {
            # 'shipping': round(total_shipping, 2),
            # 'tax': total_tax,
            # 'service_fee': total_service_fee,
            'sub_total': total_sub_total,
            'total': total_total,
        }

        # Return the data in the response
        return Response(data)

    # def calculate_shipping(self, cart_item):
    #     # Implement your shipping calculation logic here for a single cart item
    #     # Example: Calculate based on weight, destination, etc.
    #     return cart_item.shipping_amount

    # def calculate_tax(self, cart_item):
    #     # Implement your tax calculation logic here for a single cart item
    #     # Example: Calculate based on tax rate, product type, etc.
    #     return cart_item.tax_fee

    # def calculate_service_fee(self, cart_item):
    #     # Implement your service fee calculation logic here for a single cart item
    #     # Example: Calculate based on service type, cart total, etc.
    #     return cart_item.service_fee

    def calculate_sub_total(self, cart_item):
        # Implement your service fee calculation logic here for a single cart item
        # Example: Calculate based on service type, cart total, etc.
        return cart_item.sub_total

    def calculate_total(self, cart_item):
        # Implement your total calculation logic here for a single cart item
        # Example: Sum of sub_total, shipping, tax, and service_fee
        return cart_item.total
class CartUpdateAPIView(APIView):
    permission_classes = [AllowAny]

    def put(self, request, cart_id, item_id):
        try:
            cart_item = Cart.objects.get(cart_id=cart_id, id=item_id)
        except Cart.DoesNotExist:
            return Response({"error": "Cart item not found"}, status=status.HTTP_404_NOT_FOUND)

        quantity = request.data.get('qty')
        price = request.data.get('price')

        if quantity is not None and price is not None:
            cart_item.qty = int(quantity)
            cart_item.price = Decimal(price)
            cart_item.total = cart_item.qty * cart_item.price
            cart_item.save()

            serializer = CartSerializer(cart_item)
            return Response(serializer.data)
        else:
            return Response({"error": "Quantity and price are required"}, status=status.HTTP_400_BAD_REQUEST)

class CartDeleteAPIView(APIView):
    permission_classes = [AllowAny]

    def delete(self, request, cart_id, item_id, user_id=None):
        try:
            if user_id:
                cart_item = Cart.objects.get(cart_id=cart_id, id=item_id, user_id=user_id)
            else:
                cart_item = Cart.objects.get(cart_id=cart_id, id=item_id, user__isnull=True)
        except Cart.DoesNotExist:
            return Response({"error": "Cart item not found"}, status=status.HTTP_404_NOT_FOUND)

        cart_item.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)



class CreateOrderAPIView(generics.CreateAPIView):
    serializer_class = CartOrderSerializer
    permission_classes = [AllowAny]

    def create(self, request, *args, **kwargs):
        data = request.data
        user = request.user if request.user.is_authenticated else None
        cart_id = data.get('cart_id')
        
        # Fetch cart items
        cart_items = Cart.objects.filter(cart_id=cart_id)
        if not cart_items.exists():
            return Response({"error": "No items in cart"}, status=status.HTTP_400_BAD_REQUEST)

        # Create order
        order = CartOrder.objects.create(
            buyer=user,
            full_name=data.get('full_name'),
            email=data.get('email'),
            mobile=data.get('mobile'),
            address=data.get('address'),
            payment_status="pending",
            order_status="order_placed"
        )

        total = Decimal('0.00')
        for item in cart_items:
            CartOrderItem.objects.create(
                order=order,
                product=item.product,
                qty=item.qty,
                price=item.price,
                total=item.total,
                vendor=item.product.vendor
            )
            order.vendor.add(item.product.vendor)
            total += item.total

        order.total = total
        order.sub_total = total  # Adjust if you have additional fees
        order.save()

        # Clear the cart
        cart_items.delete()

        serializer = self.get_serializer(order)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
