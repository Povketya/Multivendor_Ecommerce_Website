from django.contrib import admin
from store.models import Product, Category, Gallery, Specification, Cart, CartOrder, CartOrderItem, Review, Wishlist, Notification

class GalleryInline(admin.TabularInline):
    model = Gallery
    extra = 0

class SpecificationInline(admin.TabularInline):
    model = Specification
    extra = 0

# class ColorInline(admin.TabularInline):
#     model = Color
#     extra = 0


class ProductAdmin(admin.ModelAdmin):
    list_display = ['title', 'price', 'category', 'stock_qty', 'in_stock', 'vendor', 'featured']
    list_editable = ['featured']
    list_filter = ['category', 'date']  
    search_fields = ['title']
    inlines = [GalleryInline, SpecificationInline]

class ReviewAdmin(admin.ModelAdmin):
    list_display = ['user', 'product', 'rating', 'date']
    list_filter = ['rating', 'date']
    search_fields = ['user', 'product']
    

admin.site.register(Category)
admin.site.register(Product, ProductAdmin)
admin.site.register(CartOrder)
admin.site.register(Cart)
admin.site.register(CartOrderItem)
admin.site.register(Review, ReviewAdmin)
