"use client";
import React, { useState } from "react";
import { toast } from "sonner";
import Button from "../ui/Button";
import InputField from "../ui/InputField";
import { CalendarDays, Mail, User } from "lucide-react";
import Link from "next/link";

export default function Contact() {
  const [formValues, setFormValues] = useState({
    Name: "",
    Email: "",
    Message: "",
  });

  const [errors, setErrors] = useState<{
    Name?: string;
    Email?: string;
    Message?: string;
  }>({});

  const validateEmail = (email: string): boolean =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validateForm = () => {
    const newErrors: { Name?: string; Email?: string; Message?: string } = {};

    if (!formValues.Name.trim()) {
      newErrors.Name = "Name is required";
    } else if (formValues.Name.length < 2) {
      newErrors.Name = "Name must be at least 2 characters";
    }

    if (!formValues.Email.trim()) {
      newErrors.Email = "Email is required";
    } else if (!validateEmail(formValues.Email)) {
      newErrors.Email = "Email is invalid";
    }

    if (!formValues.Message.trim()) {
      newErrors.Message = "Message is required";
    } else if (formValues.Message.length < 10) {
      newErrors.Message = "Message must be at least 10 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    const { name, value } = e.target;
    setFormValues((prev: FormValues) => ({
      ...prev,
      [name]: value,
    }));
    setErrors((prev: FormErrors) => ({ ...prev, [name]: "" })); // clear field error on typing
  };

  interface FormValues {
    Name: string;
    Email: string;
    Message: string;
  }

  interface FormErrors {
    Name?: string;
    Email?: string;
    Message?: string;
  }

  interface ApiResponse {
    success: boolean;
    message?: string;
  }

  const onSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();

    if (!validateForm()) {
      toast.error("Please fix the errors in the form");
      return;
    }

    const loadingToast = toast.loading("Sending...");

    const formData = new FormData();
    formData.append("Name", formValues.Name);
    formData.append("Email", formValues.Email);
    formData.append("Message", formValues.Message);
    formData.append("access_key", "562587a0-8f22-41a1-8ec7-924cb21fe335");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    });

    const data: ApiResponse = await response.json();

    if (data.success) {
      toast.success("Form submitted successfully!", { id: loadingToast });
      setFormValues({ Name: "", Email: "", Message: "" });
      setErrors({});
    } else {
      toast.error(data.message || "Something went wrong", {
        id: loadingToast,
      });
    }
  };

  return (
    <section id="contact" data-aos="fade-up" data-aos-delay="100">
      <div className="container mx-auto py-[80px]">
        <div data-aos="fade-down" data-aos-delay="200" className="mb-6">
          <h1 className="text-[28px] md:text-[38px] lg:text-[38px] font-medium text-center thai-text mb-[8px]">
            Contact <span className="text-[#FA7892]">Me</span>
          </h1>
          <p className="text-[16px] md:text-[16px] lg:text-[18px] font-normal text-[#000000] text-center">
            Choose your preferred way to connect with me
          </p>
        </div>

        <div className="flex flex-col items-center justify-center md:flex-col lg:flex-row gap-[30px] mt-[48px]">
          {/* Contact Form */}
          <div className="shadow-[0px_6px_16px_4px_#FEEBEF] w-full md:w-[80%] lg:w-[605px] h-auto rounded-[5px]">
            <div className="py-[45px] px-[26px]">
              <form onSubmit={onSubmit} noValidate>
                <InputField
                  name="Name"
                  label="Name"
                  placeholder="Your name"
                  value={formValues.Name}
                  onChange={handleChange}
                  icon={<User size={18} />}
                  css="pl-10"
                />
                {errors.Name && (
                  <p className="text-red-500 text-sm mt-1">{errors.Name}</p>
                )}

                <InputField
                  name="Email"
                  label="Email"
                  placeholder="johndoe@gmail.com"
                  value={formValues.Email}
                  onChange={handleChange}
                  icon={<Mail size={18} />}
                  css="pl-10"
                />
                {errors.Email && (
                  <p className="text-red-500 text-sm">{errors.Email}</p>
                )}

                <div className="flex flex-col gap-2 mt-4">
                  <label className="label-class">Message</label>
                  <textarea
                    name="Message"
                    value={formValues.Message}
                    onChange={handleChange}
                    className="w-full h-[152px] border border-[#EFEFEF] rounded-[5px] p-[16px] hover:border focus:border-[3px] focus:bg-white focus:outline-none resize-none"
                    placeholder="Your message"
                  ></textarea>
                  {errors.Message && (
                    <p className="text-red-500 text-sm">{errors.Message}</p>
                  )}
                </div>

                <div className="flex items-center justify-center mt-[10px]">
                  <Button
                    type="submit"
                    icon={null}
                    style="pink"
                    css="w-[393px] h-[43px] rounded-[31px] font-bold text-[#000000]"
                  >
                    Send Message
                  </Button>
                </div>
              </form>
            </div>
          </div>

          {/* Schedule Call - unchanged */}
          {/* You can leave this part as is or update it later */}
          <div className="shadow-[0px_6px_16px_4px_#FEEBEF] w-full md:w-[80%] lg:w-[605px] h-[560px] rounded-[5px]">
            <div className="p-[45px] pb-[180px] px-[55px]">
              <div className="flex items-center justify-center flex-col">
                <div className="w-[60px] h-[60px] bg-[#FEF0F3] rounded-full flex items-center justify-center mb-[16px]">
                  <CalendarDays size={25} color="#FA7892" />
                </div>
                <div className="w-full max-w-[496px]">
                  <h1 className="text-[16px] md:text-[16px] lg:text-[20px] font-semibold text-[#000000] text-center">
                    Schedule a Call
                  </h1>
                  <p className="text-[#00000066] text-center text-[16px] mb-[32px]">
                    Book a 30-minuter consultation to discuss your project in
                    detail. I&apos;ll be happy to answer any questions you might
                    have.
                  </p>
                  <div className="flex items-center justify-center mt-[28px] mb-[56px]">
                    {/* <Link href="https://koalendar.com/e/meet-with-ewherhe-akpesiri"> */}
                    <Link href="https://calendly.com/ugochinyere/discovery-call?month=2025-06">
                      <Button
                        type="submit"
                        icon={null}
                        style="pink"
                        css="w-[200px] lg:w-[393px] h-[43px] rounded-[31px] font-bold text-[#000000]"
                      >
                        Book a Call
                      </Button>
                    </Link>
                  </div>
                  <hr className="border border-[#E2E2E2AB]" />
                  <div className="pt-[32px] flex items-center justify-center gap-[8px] w-full mx-w-[236px] mx-auto">
                    <span>
                      <CalendarDays size={22} color="#00000066" />
                    </span>
                    <p className="text-[14px] lg:text-[16px] text-[#00000066]">
                      Avaliable Monday to Friday
                    </p>
                  </div>
                  <div className="text-center mt-4">
                   <Link href="https://calendly.com/ugochinyere/discovery-call" className="">
                      <p className="text-[13px] text-[#00000099] underline hover:text-[#FA7892] transition duration-200">
                        Or book a free consultation call
                      </p>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
