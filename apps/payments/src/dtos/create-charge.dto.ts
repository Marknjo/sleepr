import { IsObject, IsPositive } from 'class-validator'
import Stripe from 'stripe'

export class CreateChargeDto {
  @IsObject()
  card: Stripe.PaymentMethodCreateParams.Card1

  @IsPositive()
  amount: number
}
