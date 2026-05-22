import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import Stripe from 'stripe';
import type { Stripe as StripeType } from 'stripe';
import { CreatePaymentIntentDto } from './dto/create-payment-intent.dto';
import { PaymentStatus, Prisma } from '@prisma/client';
import { ConfirmPaymentDto } from './dto/confirm-payment.dto';
import { PaymentResponseDto } from './dto/payment-response.dto';

@Injectable()
export class PaymentsService {
  // private stripe: StripeType;

  // constructor(private prisma: PrismaService) {
  //   this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  //     apiVersion: '2026-04-22.dahlia',
  //   });
  // }

  // // Create payment intent
  // async createPaymentIntent(
  //   userId: string,
  //   createPaymentIntentDto: CreatePaymentIntentDto,
  // ): Promise<{
  //   success: boolean;
  //   data: { clientSecret: string; paymentId: string };
  //   message: string;
  // }> {
  //   const { orderId, amount, currency = 'usd' } = createPaymentIntentDto;

  //   const order = await this.prisma.order.findFirst({
  //     where: { id: orderId, userId },
  //   });

  //   if (!order) {
  //     throw new NotFoundException(`Order with ID ${orderId} not found`);
  //   }

  //   const existingPayment = await this.prisma.payment.findFirst({
  //     where: { orderId },
  //   });
  //   if (existingPayment && existingPayment.status === PaymentStatus.COMPLETED) {
  //     throw new BadRequestException('payment already completed for this order');
  //   }

  //   const paymentIntent = await this.stripe.paymentIntents.create({
  //     amount: Math.round(amount * 100),
  //     currency,
  //     metadata: { orderId, userId },
  //   });

  //   const payment = await this.prisma.payment.create({
  //     data: {
  //       orderId,
  //       userid: userId,
  //       amount,
  //       currency,
  //       status: PaymentStatus.PENDING,
  //       paymentMethod: 'STRIPE',
  //       transactionId: paymentIntent.id,
  //     },
  //   });

  //   return {
  //     success: true,
  //     data: {
  //       clientSecret: paymentIntent.client_secret!,
  //       paymentId: payment.id,
  //     },
  //     message: 'Payment intent created successfully',
  //   };
  // }

  // // Confirm payment intent
  // async confirmPayment(
  //   userId: string,
  //   confirmPaymentDto: ConfirmPaymentDto,
  // ): Promise<{ success: boolean; data: PaymentResponseDto; message: string }> {
  //   const { paymentIntentId, orderId } = confirmPaymentDto;

  //   const payment = await this.prisma.payment.findFirst({
  //     where: {
  //       orderId,
  //       userid: userId,
  //       transactionId: paymentIntentId,
  //     },
  //   });

  //   if (!payment) {
  //     throw new NotFoundException('payment not found');
  //   }

  //   if (payment.status === PaymentStatus.COMPLETED) {
  //     throw new BadRequestException('Payment already completed ');
  //   }

  //   const paymentIntent =
  //     await this.stripe.paymentIntents.retrieve(paymentIntentId);

  //   if (paymentIntent.status !== 'succeeded') {
  //     throw new BadRequestException('Payment not successful');
  //   }

  //   const [updatedPayment] = await this.prisma.$transaction([
  //     this.prisma.payment.update({
  //       where: { id: payment.id },
  //       data: { status: PaymentStatus.COMPLETED },
  //     }),

  //     this.prisma.order.update({
  //       where: { id: orderId },
  //       data: { status: 'PROCESSING' },
  //     }),
  //   ]);

  //   const order = await this.prisma.order.findFirst({
  //     where: {
  //       id: orderId,
  //     },
  //   });

  //   if (order?.cartId) {
  //     await this.prisma.cart.update({
  //       where: { id: order.cartId },
  //       data: { checkedOut: true },
  //     });
  //   }

  //   return {
  //     success: true,
  //     data: this.mapToPaymentResponse({
  //       ...updatedPayment,
  //       userId: updatedPayment.userid,
  //     }),
  //     message: ' Payment confirmed successfully',
  //   };
  // }

  // // Get all payments for current user
  // async findAll(userId: string): Promise<{
  //   success: boolean;
  //   data: PaymentResponseDto[];
  //   message: string;
  // }> {
  //   const payments = await this.prisma.payment.findMany({
  //     where: { userid: userId },
  //     orderBy: { createdAt: 'desc' },
  //   });

  //   return {
  //     success: true,
  //     data: payments.map((payment) => this.mapToPaymentResponse(payment)),
  //     message: 'Payments retrieved successfully',
  //   };
  // }

  // // Get payment by ID
  // async findOne(
  //   id: string,
  //   userId: string,
  // ): Promise<{
  //   success: boolean;
  //   data: PaymentResponseDto;
  //   message: string;
  // }> {
  //   const payment = await this.prisma.payment.findFirst({
  //     where: { id, userid: userId },
  //   });

  //   if (!payment) {
  //     throw new NotFoundException(`Payment with ID ${id} not found`);
  //   }

  //   return {
  //     success: true,
  //     data: this.mapToPaymentResponse(payment),
  //     message: 'Payment retrieved successfully',
  //   };
  // }

  // // Get payment by Order ID
  // async findByOrder(
  //   orderId: string,
  //   userId: string,
  // ): Promise<{
  //   success: boolean;
  //   data: PaymentResponseDto | null;
  //   message: string;
  // }> {
  //   const payment = await this.prisma.payment.findFirst({
  //     where: { orderId, userid: userId },
  //   });

  //   return {
  //     success: true,
  //     data: payment ? this.mapToPaymentResponse(payment) : null,
  //     message: 'Payment retrieved successfully',
  //   };
  // }

  // private mapToPaymentResponse(payment: any): PaymentResponseDto {
  //   return {
  //     id: payment.id,
  //     orderId: payment.orderId,
  //     userId: payment.userid,
  //     currency: payment.currency,
  //     amount: typeof payment.amount === 'object' && typeof payment.amount.toNumber === 'function' ? payment.amount.toNumber() : payment.amount,
  //     status: payment.status,
  //     paymentMethod: payment.paymentMethod,
  //     transactionId: payment.transactionId,
  //     createdAt: payment.createdAt,
  //     updatedAt: payment.updatedAt,
  //   };
  // }
}
