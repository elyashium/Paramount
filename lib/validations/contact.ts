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
    fatherMobile: phoneSchema,
    dob: z.string().min(1, 'Date of birth is required'),
    gender: z.enum(['male', 'female'], { errorMap: () => ({ message: 'Please select a gender' }) }),
    schoolName: z.string().min(3, 'School name is required'),
    board: z.enum(['cbse', 'icse', 'state'], { errorMap: () => ({ message: 'Please select a board' }) }),
    currentClass: z.enum(['11', '12', 'passed'], { errorMap: () => ({ message: 'Please select your class' }) }),
    address: z.string().min(10, 'Please enter a full address'),
    city: z.string().min(2, 'City is required'),
    pincode: z.string().regex(/^\d{6}$/, 'Pincode must be 6 digits'),
    course: z.enum(['imu_cet', 'sponsorship', 'english', 'combo'], {
        errorMap: () => ({ message: 'Please select a target program' })
    }),
})

export type ContactFormValues = z.infer<typeof contactFormSchema>
