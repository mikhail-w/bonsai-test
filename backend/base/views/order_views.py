from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from rest_framework import status
from datetime import datetime

from base.models import Product, Order, OrderItem, ShippingAddress
from base.serializers import OrderSerializer


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def addOrderItems(request):
    user = request.user
    data = request.data

    # Validate order items
    orderItems = data.get("orderItems", [])
    if not orderItems or len(orderItems) == 0:
        return Response(
            {"detail": "No order items provided"}, status=status.HTTP_400_BAD_REQUEST
        )

    try:
        # (1) Create the order
        order = Order.objects.create(
            user=user,
            paymentMethod=data.get("paymentMethod"),
            taxPrice=data.get("taxPrice", 0),
            shippingPrice=data.get("shippingPrice", 0),
            totalPrice=data.get("totalPrice", 0),
        )

        # (2) Create the shipping address
        shipping_address_data = data.get("shippingAddress", {})
        ShippingAddress.objects.create(
            order=order,
            address=shipping_address_data.get("address", ""),
            city=shipping_address_data.get("city", ""),
            postalCode=shipping_address_data.get("postalCode", ""),
            country=shipping_address_data.get("country", ""),
        )

        # (3) Create order items and update stock
        for item_data in orderItems:
            product = get_object_or_404(Product, _id=item_data["product"])

            # Create order item
            item = OrderItem.objects.create(
                product=product,
                order=order,
                name=product.name,
                qty=item_data["qty"],
                price=item_data["price"],
                image=product.image.url,
            )

            # Update product stock
            if product.countInStock < item.qty:
                return Response(
                    {"detail": f"Not enough stock for product {product.name}"},
                    status=status.HTTP_400_BAD_REQUEST,
                )

            product.countInStock -= item.qty
            product.save()

        serializer = OrderSerializer(order, many=False)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    except KeyError as e:
        return Response(
            {"detail": f"Missing field: {str(e)}"},
            status=status.HTTP_400_BAD_REQUEST,
        )
    except Exception as e:
        return Response(
            {"detail": f"An error occurred: {str(e)}"},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def getMyOrders(request):
    user = request.user
    orders = user.order_set.all()
    serializer = OrderSerializer(orders, many=True)
    return Response(serializer.data)


@api_view(["GET"])
@permission_classes([IsAdminUser])
def getOrders(request):
    orders = Order.objects.all()
    serializer = OrderSerializer(orders, many=True)
    return Response(serializer.data)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def getOrderById(request, pk):
    user = request.user
    try:
        order = get_object_or_404(Order, _id=pk)
        if user.is_staff or order.user == user:
            serializer = OrderSerializer(order, many=False)
            return Response(serializer.data)
        else:
            return Response(
                {"detail": "Not authorized to view this order"},
                status=status.HTTP_403_FORBIDDEN,
            )
    except Exception as e:
        return Response(
            {"detail": f"Order does not exist: {str(e)}"},
            status=status.HTTP_404_NOT_FOUND,
        )


@api_view(["PUT"])
@permission_classes([IsAuthenticated])
def updateOrderToPaid(request, pk):
    try:
        order = get_object_or_404(Order, _id=pk)

        order.isPaid = True
        order.paidAt = datetime.now()
        order.save()

        return Response({"detail": "Order marked as paid"}, status=status.HTTP_200_OK)
    except Exception as e:
        return Response(
            {"detail": f"An error occurred: {str(e)}"},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )


@api_view(["PUT"])
@permission_classes([IsAdminUser])
def updateOrderToDelivered(request, pk):
    try:
        order = get_object_or_404(Order, _id=pk)

        order.isDelivered = True
        order.deliveredAt = datetime.now()
        order.save()

        return Response(
            {"detail": "Order marked as delivered"}, status=status.HTTP_200_OK
        )
    except Exception as e:
        return Response(
            {"detail": f"An error occurred: {str(e)}"},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )
