import { OrderStatus, PaymentStatus } from "./enum";

export const statusVariants: {
  orderStatus: Record<OrderStatus, "warning" | "info" | "success" | "error">;
  paymentStatus: Record<
    PaymentStatus,
    "warning" | "success" | "error" | "info"
  >;
  userStatus: Record<
    "ACTIVE" | "INACTIVE" | "SUSPENDED",
    "success" | "error" | "warning"
  >;
} = {
  orderStatus: {
    [OrderStatus.PENDING]: "warning",
    [OrderStatus.CONFIRMED]: "info",
    [OrderStatus.SHIPPED]: "info",
    [OrderStatus.DELIVERED]: "success",
    [OrderStatus.CANCELLED]: "error",
    [OrderStatus.RETURNED]: "error",
  },
  paymentStatus: {
    [PaymentStatus.PENDING]: "warning",
    [PaymentStatus.PAID]: "success",
    [PaymentStatus.FAILED]: "error",
    [PaymentStatus.REFUNDED]: "info",
  },
  userStatus: {
    ACTIVE: "success",
    INACTIVE: "error",
    SUSPENDED: "warning",
  },
};
