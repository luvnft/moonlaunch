"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { useState } from "react";
import Image from "next/image";

const formSchema = z.object({
  name: z.string().min(2).max(50),
  ticker: z.string().min(2).max(10),
  description: z.string().min(10).max(500),
  totalSupply: z.string().regex(/^\d+$/, "Must be a valid number"),
  image: z.string().url("Must be a valid URL"),
  twitter: z.string().url("Must be a valid URL").optional(),
  telegram: z.string().url("Must be a valid URL").optional(),
  website: z.string().url("Must be a valid URL").optional(),
});

export default function CreatePage() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      ticker: "",
      description: "",
      totalSupply: "",
      image: "",
      twitter: "",
      telegram: "",
      website: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    toast({
      title: "Token Creation Initiated",
      description: "Your memecoin is being created. Please wait...",
    });
    console.log(values);
  }

  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("run")
    const response = await fetch("/api/predictions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: e.target.prompt.value,
      }),
    });

    console.log(response)
    let prediction = await response.json();
    if (response.status !== 201) {
      setError(prediction.detail);
      return;
    }
    setPrediction(prediction);
    console.log({ prediction })

    while (
      prediction.status !== "succeeded" &&
      prediction.status !== "failed"
    ) {
      await sleep(1000);
      const response = await fetch("/api/predictions/" + prediction.id);
      prediction = await response.json();
      console.log(prediction)
      if (response.status !== 200) {
        setError(prediction.detail);
        return;
      }
      console.log({ prediction: prediction });
      setPrediction(prediction);
    }
  };

  return (
    <div className="container mx-auto py-10">

      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Create Your Memecoin</CardTitle>
          <CardDescription>
            Fill in the details below to launch your own memecoin
          </CardDescription>
        </CardHeader>
        <CardContent>

        <form className="w-full flex" onSubmit={handleSubmit}>
            <input
              type="text"
              className="flex-grow"
              name="prompt"
              placeholder="Enter a prompt to display an image"
            />
            <button className="button" type="submit">
              Go!
            </button>
          </form>
          
          <Form {...form}>
            <form className="space-y-8">
              {prediction && (
                <>
                  {prediction.output && (
                    <div className="image-wrapper mt-5">
                      <Image
                        src={prediction.output[prediction.output.length - 1]}
                        alt="output"
                        sizes="100vw"
                        height={768}
                        width={768}
                      />
                    </div>
                  )}
                  <p className="py-3 text-sm opacity-50">status: {prediction.status}</p>
                </>
              )}

              {/* <Button className="w-full" onSubmit={handleSubmit}>
                Generate Meme
              </Button> */}
            </form>
          </Form>

        </CardContent>
      </Card>

      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Final Steps</CardTitle>
          <CardDescription>
            Fill in the details below to launch your own memecoin
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Token Name</FormLabel>
                    <FormControl>
                      <Input placeholder="MoonRocket" {...field} />
                    </FormControl>
                    <FormDescription>
                      Choose a catchy name for your token
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="ticker"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ticker Symbol</FormLabel>
                    <FormControl>
                      <Input placeholder="MOON" {...field} />
                    </FormControl>
                    <FormDescription>
                      A short symbol for your token (e.g., BTC, ETH)
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Tell us about your memecoin..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="twitter"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Twitter URL</FormLabel>
                    <FormControl>
                      <Input placeholder="https://twitter.com/..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="telegram"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Telegram URL</FormLabel>
                    <FormControl>
                      <Input placeholder="https://t.me/..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="website"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Website URL</FormLabel>
                    <FormControl>
                      <Input placeholder="https://..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full">
                Create Token
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
