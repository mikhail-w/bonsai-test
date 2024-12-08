from base.models import Product, Review
from base.serializers import ProductSerializer
from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from rest_framework.response import Response
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger


@api_view(["GET"])
def getProducts(request):
    query = request.query_params.get("keyword", "")
    products = Product.objects.filter(name__icontains=query)

    page = request.query_params.get("page", 1)
    paginator = Paginator(products, 4)

    try:
        products = paginator.page(page)
    except PageNotAnInteger:
        products = paginator.page(1)
    except EmptyPage:
        products = paginator.page(paginator.num_pages)

    serializer = ProductSerializer(products, many=True)

    return Response(
        {"products": serializer.data, "page": int(page), "pages": paginator.num_pages}
    )


@api_view(["GET"])
def getTopProducts(request):
    products = Product.objects.filter(rating__gte=4).order_by("-rating")[:5]
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)


@api_view(["GET"])
def getPlanterProducts(request):
    products = Product.objects.filter(category="Planter")
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)


@api_view(["GET"])
def getPlantProducts(request):
    products = Product.objects.filter(category="Potted Plants")
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)


@api_view(["GET"])
def getEssentialProducts(request):
    products = Product.objects.filter(category="Essentials")
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)


@api_view(["GET"])
def getProduct(request, pk):
    product = get_object_or_404(Product, _id=pk)
    serializer = ProductSerializer(product, many=False)
    return Response(serializer.data)


@api_view(["POST"])
@permission_classes([IsAdminUser])
def createProduct(request):
    user = request.user

    product = Product.objects.create(
        user=user,
        name="Sample Name",
        price=0,
        _type="Sample Type",
        countInStock=0,
        category="Sample Category",
        description="",
    )

    serializer = ProductSerializer(product, many=False)
    return Response(serializer.data, status=status.HTTP_201_CREATED)


@api_view(["PUT"])
@permission_classes([IsAdminUser])
def updateProduct(request, pk):
    data = request.data
    product = get_object_or_404(Product, _id=pk)

    product.name = data.get("name", product.name)
    product.price = data.get("price", product.price)
    product._type = data.get("_type", product._type)
    product.countInStock = data.get("countInStock", product.countInStock)
    product.category = data.get("category", product.category)
    product.description = data.get("description", product.description)

    product.save()

    serializer = ProductSerializer(product, many=False)
    return Response(serializer.data)


@api_view(["DELETE"])
@permission_classes([IsAdminUser])
def deleteProduct(request, pk):
    product = get_object_or_404(Product, _id=pk)
    product.delete()
    return Response(
        {"detail": "Product deleted successfully"}, status=status.HTTP_200_OK
    )


@api_view(["POST"])
def uploadImage(request):
    data = request.data
    product_id = data.get("product_id")

    product = get_object_or_404(Product, _id=product_id)

    if "image" in request.FILES:
        product.image = request.FILES["image"]
        product.image.name = f"products/{product.image.name}"

    product.save()

    return Response(
        {"detail": "Image uploaded successfully"}, status=status.HTTP_200_OK
    )


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def createProductReview(request, pk):
    user = request.user
    product = get_object_or_404(Product, _id=pk)
    data = request.data

    # Check if review already exists
    if product.reviews.filter(user=user).exists():  # Use the `related_name` reviews
        return Response(
            {"detail": "Product already reviewed"}, status=status.HTTP_400_BAD_REQUEST
        )

    # Validate rating
    if data.get("rating") is None or data["rating"] == 0:
        return Response(
            {"detail": "Please provide a valid rating"},
            status=status.HTTP_400_BAD_REQUEST,
        )

    # Create the review
    review = Review.objects.create(
        user=user,
        product=product,
        name=user.first_name or user.username,
        rating=data["rating"],
        comment=data.get("comment", ""),
    )

    # Update product rating and review count
    reviews = product.reviews.all()  # Use `related_name` reviews
    product.numReviews = reviews.count()
    product.rating = sum([review.rating for review in reviews]) / reviews.count()
    product.save()

    return Response(
        {"detail": "Review added successfully"}, status=status.HTTP_201_CREATED
    )
