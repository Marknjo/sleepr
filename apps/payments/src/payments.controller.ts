import { Controller } from '@nestjs/common'
import { PaymentsService } from './payments.service'
import { MessagePattern, Payload } from '@nestjs/microservices'
import { CreateChargeDto } from './dtos/create-charge.dto'

@Controller()
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @MessagePattern('create_charge')
  createCharge(@Payload() paymentData: CreateChargeDto) {
    const { card, amount } = paymentData
    return this.paymentsService.createCharge(card, amount)
  }
}
