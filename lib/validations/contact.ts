import { z } from 'zod'

// Shared phone validator: must be 10 digits, optionally prefixed with +91
const phoneSchema = z
    .string()
    .regex(/^(\+91)?[6-9]\d{9}$/, 'Please enter a valid Indian mobile number')

export const contactFormSchema = z.object({
    firstName: z.string().min(2, 'First name must be at least 2 characters').max(50),
    lastName: z.string().min(2, 'Last name must be at least 2 characters').max(50),
    email: z.string().email('Please enter a valid email address'),
    mobile: phoneSchema,
    dob: z.string().min(1, 'Date of birth is required'),
    gender: z.enum(['male', 'female'], { errorMap: () => ({ message: 'Please select a gender' }) }),
    city: z.string().min(2, 'City is required'),
    course: z.enum(['imu_cet', 'sponsorship', 'english', 'combo'], {
        errorMap: () => ({ message: 'Please select a target program' })
    }),
})

export type ContactFormValues = z.infer<typeof contactFormSchema>
