from django.urls import path
from userauths import views as userauths_views
from store import views as store_views
from customer import views as customer_views
from vendor import views as vendor_views

from rest_framework_simplejwt.views import TokenRefreshView


urlpatterns = [
    # path('', userauths_views.getRoutes),

    # Userauths API Endpoints
    path('user/token/', userauths_views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('user/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('user/register/', userauths_views.RegisterView.as_view(), name='auth_register'),
    # path('user/profile/<user_id>/', userauths_views.ProfileView.as_view(), name='user_profile'),
    # path('user/test/', userauths_views.testEndPoint, name='auth_register'),
    path('user/password-reset/<email>/', userauths_views.PasswordRestEmailVerify.as_view(), name='password_reset'),
    path('user/password-change/', userauths_views.PasswordChangeView.as_view(), name='password_reset'),
    
    # Adoon Endpoint
    # path('addon/', store_views.ConfigSettingsDetailView.as_view(), name='addon'),


    # Store API Endpoints
    path('category/', store_views.CategoryListAPIView.as_view(), name='category'),
    # path('brand/', store_views.BrandListView.as_view(), name='brand'),
    path('products/', store_views.ProductListAPIView.as_view(), name='products'),
    # path('featured-products/', store_views.FeaturedProductListView.as_view(), name='featured-products'),
    path('products/<slug:slug>/', store_views.ProductDetailAPIView.as_view(), name='brand'),
    path('cart-view/', store_views.CartAPIView.as_view()),
    path('cart-list/<str:cart_id>/<int:user_id>/', store_views.CartListView.as_view()),
    path('cart-list/<str:cart_id>/', store_views.CartListView.as_view()),
    path('cart-detail/<str:cart_id>/', store_views.CartDetailView.as_view()),
    path('cart-detail/<str:cart_id>/<int:user_id>/', store_views.CartDetailView.as_view()),
    path('cart-update/<str:cart_id>/<int:item_id>/', store_views.CartUpdateAPIView.as_view(), name='cart-update'),
    path('cart-delete/<str:cart_id>/<int:item_id>/', store_views.CartDeleteAPIView.as_view(), name='cart-delete'),
    path('cart-delete/<str:cart_id>/<int:item_id>/<int:user_id>/', store_views.CartDeleteAPIView.as_view(), name='cart-delete-user'),
    path('create-order/', store_views.CreateOrderAPIView.as_view(), name='create-order'),


    path('vendor/', store_views.CreateOrderAPIView.as_view(), name='create-order'),
    path('vendors/', vendor_views.VendorListAPIView.as_view(), name='vendor-list'),

]