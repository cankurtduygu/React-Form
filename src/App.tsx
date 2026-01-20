import { Button } from "./components/ui/button"
import { useForm } from "react-hook-form"
import { Form, FormMessage } from "./components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { FormControl, FormField, FormItem, FormLabel } from "./components/ui/form"
import { Input } from "./components/ui/input"
import { RadioGroup, RadioGroupItem } from "./components/ui/radio-group"
import { Textarea } from "./components/ui/textarea"
// import { Check } from "lucide-react"
import { Checkbox } from "./components/ui/checkbox"
import { Toaster } from "@/components/ui/sonner"
import { toast } from "sonner"




const formSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  topic:z.enum(["Frontend","Backend"],),
  message: z.string().min(10, "Message must be at least 10 characters long"),
  terms: z.boolean().refine((val) => val === true, { message: "You must accept the terms and conditions" }),
})

function App() {

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      topic: "Frontend",
      message: "",
      terms: false,
    },
  })

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log("Form submitted", data);  
    toast.success("Form submitted successfully!")
    form.reset();
  }
    
  return (
    <>
      <Toaster position="top-center"/>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 p-10 rounded-2xl w-3xl"
        >
          <h1 className="text-3xl font-bold mb-8">Ask your Question</h1>
          <div className="grid grid-cols-2 gap-x-4 gap-y-6">
            <FormField
              name="firstName"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="lastName"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem className="col-[1/-1] ">
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="topic"
              control={form.control}
              render={({ field }) => (
                <FormItem className="col-[1/-1]">
                  <FormLabel className="mb-1">What would you like to talk about?</FormLabel>
                  <FormControl className="flex">
                    <RadioGroup 
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    >
                      <FormItem className="flex items-center gap-3 basis-1/2">
                        <FormControl>
                          <RadioGroupItem value="Frontend" />
                        </FormControl>
                        <FormLabel>Frontend</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center gap-3 basis-1/2">
                        <FormControl>
                          <RadioGroupItem value="Backend" />
                        </FormControl>
                        <FormLabel>Backend</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="message"
              control={form.control}
              render={({ field }) => (
                <FormItem className="col-[1/-1] ">
                  <FormLabel>Message</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="terms"
              control={form.control}
              render={({ field }) => (
                <FormItem className="col-[1/-1]">
                  <div className="flex items-center">
                    <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel className="text-sm ml-2">I agree to the terms and conditions</FormLabel>

                  </div>
                  
                  
                  <FormMessage />
                </FormItem>
              )}
            />
              

             

              


          </div>
          <Button className="w-full mt-4 h-12 text-xl">Submit</Button>
        </form>
      </Form>
      
    </>
  )
}

export default App
