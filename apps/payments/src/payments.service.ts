import { Injectable, Logger, LoggerService } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import Stripe from 'stripe'

@Injectable()
export class PaymentsService {
  private readonly logger: LoggerService = new Logger(PaymentsService.name)

  private readonly stripe = new Stripe(
    this.configSrv.get('STRIPE_SECRET_KEY'),
    {
      apiVersion: '2023-10-16',
    },
  )

  constructor(private readonly configSrv: ConfigService) {}

  async createCharge(
    card: Stripe.PaymentMethodCreateParams.Card1,
    amount: number,
  ) {
    // create payment method
    const paymentMethod = await this.stripe.paymentMethods.create({
      type: 'card',
      card,
    })

    // create payment intent
    const paymentIntent = await this.stripe.paymentIntents.create({
      payment_method: paymentMethod.id,
      amount: amount * 100,
      confirm: true,
      payment_method_types: ['card'],
      currency: 'used',
    })

    this.logger.log('Created a new payment intent')

    return paymentIntent
  }
}
