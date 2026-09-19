import { describe, it, expect } from 'vitest'

describe('Checkout Validations', () => {
  it('should validate 16 digit card number', () => {
    const validCard = '1234567812345678'
    const invalidCard1 = '1234'
    const invalidCard2 = '12345678123456789'
    const isValid = (num: string) => /^\d{16}$/.test(num)

    expect(isValid(validCard)).toBe(true)
    expect(isValid(invalidCard1)).toBe(false)
    expect(isValid(invalidCard2)).toBe(false)
  })

  it('should validate MM/YY expiry format', () => {
    const validExpiry1 = '12/25'
    const validExpiry2 = '01/99'
    const invalidExpiry1 = '13/25'
    const invalidExpiry2 = '1/25'
    const invalidExpiry3 = '12/5'
    const isValid = (exp: string) => /^(0[1-9]|1[0-2])\/\d{2}$/.test(exp)

    expect(isValid(validExpiry1)).toBe(true)
    expect(isValid(validExpiry2)).toBe(true)
    expect(isValid(invalidExpiry1)).toBe(false)
    expect(isValid(invalidExpiry2)).toBe(false)
    expect(isValid(invalidExpiry3)).toBe(false)
  })

  it('should validate CVC format', () => {
    const validCvc1 = '123'
    const validCvc2 = '1234'
    const invalidCvc1 = '12'
    const invalidCvc2 = '12345'
    const isValid = (cvc: string) => /^\d{3,4}$/.test(cvc)

    expect(isValid(validCvc1)).toBe(true)
    expect(isValid(validCvc2)).toBe(true)
    expect(isValid(invalidCvc1)).toBe(false)
    expect(isValid(invalidCvc2)).toBe(false)
  })
})
