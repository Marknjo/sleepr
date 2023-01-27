import {
  IsCreditCard,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
} from 'class-validator'

export class CardDto {
  /**
   * The card's CVC. It is highly recommended to always include this value.
   */
  @IsString()
  @IsNotEmpty()
  cvc: string

  /**
   * Two-digit number representing the card's expiration month.
   */

  @IsNumber({
    maxDecimalPlaces: 0,
  })
  @IsPositive()
  exp_month: number

  /**
   * Four-digit number representing the card's expiration year.
   */
  @IsNumber({
    maxDecimalPlaces: 0,
  })
  @IsPositive()
  exp_year: number

  /**
   * The card number, as a string without any separators.
   */
  @IsCreditCard()
  number: string
}
