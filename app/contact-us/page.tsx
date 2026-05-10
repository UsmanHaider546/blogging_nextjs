"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2 } from "lucide-react"

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    title: "",
    Description: "",
  })

  const [errors, setErrors]:any = useState({})
  const [serverErrors, setServerErrors] = useState([]) // Added to store raw server errors array
  const [isLoading, setIsLoading] = useState(false)
  const [successMessage, setSuccessMessage] = useState("")
  const [isPending, setIsPending] = useState(false)

  const validateForm = () => {
    const newErrors:any = {}

    // Name validation
    if (!formData.name || formData.name.trim().length < 3) {
      newErrors.name = "Name is required and must be at least 3 characters long."
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!formData.email || !emailRegex.test(formData.email)) {
      newErrors.email = "Please provide a valid email address."
    }

    // Title validation
    if (!formData.title || formData.title.trim().length < 3) {
      newErrors.title = "Title is required and must be at least 3 characters long."
    }

    // Description validation
    if (!formData.Description || formData.Description.trim().length < 40) {
      newErrors.Description = "Description is required and must be at least 40 characters long."
    }

    return newErrors
  }

  const handleInputChange = (e:any) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev:any) => ({
        ...prev,
        [name]: "",
      }))
    }
  }

  const handleSubmit = async (e:any) => {
    e.preventDefault()

    // Clear previous messages
    setSuccessMessage("")
    setErrors({})
    setServerErrors([]) // Clear server errors array
    setIsPending(false)

    // Validate form
    const validationErrors = validateForm()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch("/api/contact-us", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()
      if (response.ok) {
        setSuccessMessage(data.message)
        setFormData({
          name: "",
          email: "",
          title: "",
          Description: "",
        })
      } else {
        if (data.errors) {
          setServerErrors(data.errors) // Store raw server errors array

          const processedErrors:any = {}
          let hasPendingError = false

          data.errors.forEach((error:any) => {
            processedErrors[error.field] = error.message

            // Check if there's a pending request
            if (error.field === "Pending") {
              hasPendingError = true
            }
          })

          setErrors(processedErrors)
          setIsPending(hasPendingError)
        }
      }
    } catch (error) {
      setErrors({ general: "Something went wrong. Please try again later." })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">Contact Us</CardTitle>
            <CardDescription className="text-center">
              We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {successMessage && (
              <Alert className="mb-6 border-green-200 bg-green-50 text-green-800">
                <AlertDescription>{successMessage}</AlertDescription>
              </Alert>
            )}

            {errors.general && (
              <Alert className="mb-6 border-red-200 bg-red-50 text-red-800">
                <AlertDescription>{errors.general}</AlertDescription>
              </Alert>
            )}

            {serverErrors.length > 0 &&
              serverErrors.map((error:any, index) => {
                const isPendingError = error.field === "Pending"
                const alertClass = isPendingError
                  ? "mb-6 border-yellow-200 bg-yellow-50 text-yellow-800"
                  : "mb-6 border-red-200 bg-red-50 text-red-800"

                return (
                  <Alert key={`${error.field}-${index}`} className={alertClass}>
                    <AlertDescription>
                      {isPendingError ? `${error.field}: ${error.message}` : `${error.field}: ${error.message}`}
                    </AlertDescription>
                  </Alert>
                )
              })}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Name *</Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={errors.name ? "border-red-500" : ""}
                  disabled={isPending}
                />
                {errors.name && <p className="text-sm text-red-600">{errors.name}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={errors.email ? "border-red-500" : ""}
                  disabled={isPending}
                />
                {errors.email && <p className="text-sm text-red-600">{errors.email}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  name="title"
                  type="text"
                  value={formData.title}
                  onChange={handleInputChange}
                  className={errors.title ? "border-red-500" : ""}
                  disabled={isPending}
                />
                {errors.title && <p className="text-sm text-red-600">{errors.title}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="Description">Description *</Label>
                <Textarea
                  id="Description"
                  name="Description"
                  rows={15}
                  value={formData.Description}
                  onChange={handleInputChange}
                  className={`min-h-[12rem] ${errors.Description ? "border-red-500" : ""}`}
                  placeholder="Please provide a detailed description (minimum 40 characters)"
                                  disabled={isPending}
                                  
                />
                <p className="text-sm text-muted-foreground">{formData.Description.length}/40 characters minimum</p>
                {errors.Description && <p className="text-sm text-red-600">{errors.Description}</p>}
              </div>

              <Button type="submit" className="w-full" disabled={isLoading || isPending}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  "Submit"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
