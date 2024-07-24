"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormLabel,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import Heading from "@/components/ui/heading";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import { Store } from "@prisma/client";
import axios from "axios";
import { Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";
interface SettingFormProps {
  initialData: Store;
}

const fromSchema = z.object({
  name: z.string().min(3, { message: "Name must be at least 3 characters" }),
});

type SettingFormValues = z.infer<typeof fromSchema>;
export const SettingForm: React.FC<SettingFormProps> = ({ initialData }) => {

  const params = useParams();
  const router = useRouter()
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const form = useForm<SettingFormValues>({
    resolver: zodResolver(fromSchema),
    defaultValues: initialData,
  });

  const onSubmit = async (data: SettingFormValues) => {
    try {
      setLoading(true);

      axios.patch(`/api/stores/${params.storeId}`, data);

      router.refresh();

      toast.success("Berhasil Mengupdate Toko");
      
    } catch (error) {
        toast.error("cek kemabali data yang di input");
    } finally{
        setLoading(false);
    }
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title="Setting " description="Manage your store" />

        <Button
          disabled={loading}
          variant="destructive"
          size="sm"
          onClick={() => setOpen(true)}
        >
          <Trash
            className="
            h-4 w-4"
          />
        </Button>
      </div>

      <Separator />

      <Form {...form}>
        <form
        
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-8"
        >
          <div className="grid grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Nama Toko"
                      {...field}
                      disabled={loading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button disabled={loading} type="submit">
            Save
          </Button>
        </form>
      </Form>
    </>
  );
};
