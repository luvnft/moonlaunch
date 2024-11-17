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

import { useEffect, useState } from "react";
import Image from "next/image";
import Navbar from "@/components/navbar";
import { useSigner } from "../context/signerContext";
import { ethers, InterfaceAbi } from "ethers";
import TokenFactoryABI from "../../../abi/TokenFactory.json";

const formSchema = z.object({
  name: z.string().min(2).max(50),
  initial_supply: z.string().min(2).max(50),
  ticker: z.string().min(2).max(10),
  description: z.string().min(2).max(500).optional(),
  image: z.string().url("Must be a valid URL"),
  twitter: z.string().url("Must be a valid URL").optional(),
  telegram: z.string().url("Must be a valid URL").optional(),
  website: z.string().url("Must be a valid URL").optional(),
});

export default function CreatePage() {
  const TokenFactoryAddr = "0x42b93a5eE5839Ff8436c3CF1F310b07fAeCc0834";

  const { signer } = useSigner();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      ticker: "",
      description: "",
      image:
        "https://replicate.delivery/pbxt/HzjMKjJttfUyb6xtwsfps1SLsANZDemXLzknLZOBYZsnaOjnA/out-0.png",
      twitter: "",
      telegram: "",
      website: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (signer) {
      console.log({ values });
      await create_token(values);
      toast({
        title: "Token Creation Initiated",
        description: "Your memecoin is being created. Please wait...",
      });
      console.log(values);
    } else {
      alert("Please Connect Your Wallet");
    }
  }

  const create_token = async (data: any) => {
    const contract = new ethers.Contract(
      TokenFactoryAddr,
      TokenFactoryABI.abi as InterfaceAbi,
      signer
    );
    const addr = await signer?.getAddress();
    const res = await contract.create_token(
      data.initial_supply,
      data.name,
      data.ticker
    );

    await res.wait();
    const token_id = await contract.userToTokenId(addr);
    const token_url = await contract.userToMintedToken(addr, token_id);
    console.log({ token_url });
  };

  const sleep = (ms: any) => new Promise((r) => setTimeout(r, ms));

  const [finalImage, setFinalImage] = useState(true);
  const [prediction, setPrediction] = useState<any>(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e: any) => {
    console.log("handleSubmit");
    e.preventDefault();
    console.log("run");
    const response = await fetch("/api/predictions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: e.target.prompt.value,
      }),
    });

    console.log(response);
    let prediction = await response.json();
    if (response.status !== 201) {
      setError(prediction.detail);
      return;
    }
    setPrediction(prediction);
    console.log({ prediction });

    while (
      prediction.status !== "succeeded" &&
      prediction.status !== "failed"
    ) {
      await sleep(1000);
      const response = await fetch("/api/predictions/" + prediction.id);
      prediction = await response.json();
      console.log(prediction);
      if (response.status !== 200) {
        setError(prediction.detail);
        return;
      }
      console.log({ prediction: prediction });
      setPrediction(prediction);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto py-10">
        {!finalImage ? (
          <Card className="max-w-2xl mx-auto mt-6">
            <CardHeader>
              <CardTitle>Create Your Memecoin</CardTitle>
              <CardDescription>
                Fill in the details below to launch your own memecoin
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="w-full flex flex-col" onSubmit={handleSubmit}>
                <Input
                  type="text"
                  className="flex-grow"
                  name="prompt"
                  placeholder="Enter a prompt to generate a meme"
                />

                {prediction?.status === "" ? (
                  <Button type="submit" className="w-full mt-4">
                    Generate Meme
                  </Button>
                ) : prediction?.status === "starting" ||
                  prediction?.status === "processing" ? (
                  <Button disabled className="w-full mt-4">
                    Generating...
                  </Button>
                ) : prediction?.status === "succeeded" ? (
                  <Button type="submit" className="w-full mt-4">
                    Generate Meme Again
                  </Button>
                ) : (
                  <Button type="submit" className="w-full mt-4">
                    Generate Meme
                  </Button>
                )}

                {prediction?.status == "succeeded" && (
                  <Button
                    type="submit"
                    onClick={() => setFinalImage(true)}
                    className="w-full mt-4"
                  >
                    Launch This Meme
                  </Button>
                )}
              </form>

              <Form {...form}>
                <form className="space-y-8">
                  {prediction && (
                    <>
                      {prediction.output && (
                        <div className="image-wrapper mt-5">
                          <Image
                            src={
                              prediction.output[prediction.output.length - 1]
                            }
                            alt="output"
                            sizes="100vw"
                            height={768}
                            width={768}
                          />
                        </div>
                      )}
                      {/* <p className="py-3 text-sm opacity-50">status: {prediction.status}</p> */}
                    </>
                  )}

                  {/* <Button className="w-full" onSubmit={handleSubmit}>
                Generate Meme
              </Button> */}
                </form>
              </Form>
            </CardContent>
          </Card>
        ) : (
          <Card className="max-w-2xl mx-auto mt-6">
            <CardHeader>
              <CardTitle>Final Step</CardTitle>
              <CardDescription>
                Fill in the details below to launch your own memecoin
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-8"
                >
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
                    name="initial_supply"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>initial_supply</FormLabel>
                        <FormControl>
                          <Input placeholder="Initial Supply" {...field} />
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
                          <Input
                            placeholder="https://twitter.com/..."
                            {...field}
                          />
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
        )}
      </div>
    </>
  );
}
