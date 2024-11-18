import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import { PhoneInput } from "@/components/ui/phone-input";
import { isValidPhoneNumber } from "react-phone-number-input";

import emailjs from "@emailjs/browser";

// schema for validation
const FormSchema = z.object({
  full_name: z
    .string()
    .min(2, { message: "First name must be at least 2 characters long." })
    .max(50, { message: "First name cannot exceed 50 characters." })
    .regex(/^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/, {
      message: "First name can only contain letters, spaces, or hyphens.",
    }),

  message: z
    .string()
    .min(10, { message: "Message must be at least 10 characters long." })
    .max(500, { message: "Message cannot exceed 500 characters." })
    .regex(/^[a-zA-Z0-9\s.,!?-]+$/m, {
      message:
        "Message can only contain letters, numbers, basic punctuation, and spaces.",
    }),

  email: z.string().email({ message: "Please enter a valid email address." }),

  phone_number: z.string().refine(isValidPhoneNumber, {
    message: "Please enter a valid phone number",
  }),
});

export const ContactForm = () => {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [lastSubmissionTime, setLastSubmissionTime] = useState(0);
  const cooldownTime = 30 * 1000; // 30 seconds

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      full_name: "",
      phone_number: "",
    },
  });

  // Send data via emailjs
  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    const now = Date.now();
    if (now - lastSubmissionTime < cooldownTime) {
      setError("Please wait before resubmitting.");
      return;
    }
    setLastSubmissionTime(now);
    setIsSubmitting(true);
    setError(null);
    setSuccess(null);
    try {
      await emailjs.send(
        "service_ippckt6",
        "DNA_Contact_Form",
        data,
        "Y92gSaQ3JN4-qAFVD"
      );
      setSuccess("Message sent! You will be contacted in 2-3 business days.");
    } catch (err) {
      setError("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <Card className="mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl text-center">Get In Touch</CardTitle>
        {/* <CardDescription className="text-center">
          ..and get connected with millions of medical professionals from around
          the world!
        </CardDescription> */}
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className=" space-y-6"
            noValidate
          >
            {/* First Name field */}
            <FormField
              control={form.control}
              name="full_name"
              render={({ field }) => (
                <FormItem>
                  {/* <FormLabel>First Name</FormLabel> */}
                  <FormDescription></FormDescription>
                  <FormControl>
                    <Input type="text" placeholder="Full Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Email field */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  {/* <FormLabel>Email</FormLabel> */}
                  <FormDescription></FormDescription>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Email Address"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Phone field */}
            <FormField
              control={form.control}
              name="phone_number"
              render={({ field }) => (
                <FormItem className="flex flex-col items-start">
                  {/* <FormLabel className="text-left">Phone Number</FormLabel> */}
                  <FormControl>
                    <PhoneInput
                      className="w-full"
                      placeholder="Phone Number"
                      defaultCountry="IN"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Message field */}
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  {/* <FormLabel>Email</FormLabel> */}
                  <FormDescription></FormDescription>
                  <FormControl>
                    <Textarea
                      placeholder="Write your message here"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {error && <p className="text-destructive">{error}</p>}
            {success && <p className="text-primary">{success}</p>}

            <Button
              type="submit"
              disabled={isSubmitting}
              className="mt-4 w-full"
            >
              Send Message
            </Button>
            {/* <div className="text-center text-sm">
              Already have an account?{" "}
              <Link to="/login" className="underline">
                Log in
              </Link>
            </div> */}
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
