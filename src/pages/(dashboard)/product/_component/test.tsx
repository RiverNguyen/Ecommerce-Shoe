/* eslint-disable @typescript-eslint/no-explicit-any */
import { uploadFileCloudinary } from "@/common/lib/utils";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { PlusCircleIcon } from "lucide-react";

// const productSchema = Joi.object({
//     name: Joi.string().required().messages({
//         "any.required": "Tên sản phẩm không được để trống",
//         "string.empty": "Tên sản phẩm không được để trống",
//     }),
//     price: Joi.number().required().messages({
//         "any.required": "Giá sản phẩm không được để trống",
//         "number.base": "Giá sản phẩm phải là số",
//     }),
//     category: Joi.string().allow("").optional(),
//     image: Joi.string().allow("").optional(),
//     gallery: Joi.array().items(Joi.string()),
//     description: Joi.string().allow("").optional(),
//     discount: Joi.number().messages({
//         "number.base": "Giảm giá sản phẩm phải là số",
//     }),
//     featured: Joi.boolean().messages({
//         "boolean.base": "Trường này phải là boolean",
//     }),
//     countInStock: Joi.number().messages({
//         "number.base": "Số lượng sản phẩm phải là số",
//     }),
// });

const TestAdd = () => {
    const form = useForm();
    const [gallery, setGallery] = useState<string[]>([]);
    const [image, setImage] = useState<string>("");
    const [imagePreview, setImagePreview] = useState<string>("");
    const [galleryPreview, setGalleryPreview] = useState<string[]>([]);
    const [selectCount, setSelectCount] = useState(1);
    const [sizeCount, setSizeCount] = useState(1);
    // const { onSubmit } = MutationQuery({
    //     action: "CREATE",
    // });
    const { data: categories } = useQuery({
        queryKey: ["CATEGORY_LIST"],
        queryFn: async () => {
            const { data } = await axios.get(
                `https://test-be-phi.vercel.app/api/v1/categories`
            );
            return data;
        },
    });

    const { data: size } = useQuery({
        queryKey: ["SIZE"],
        queryFn: async () => {
            const { data } = await axios.get(
                `https://test-be-phi.vercel.app/api/v1/attributes/663796db7ec34f084a1bf2d8`
            );
            return data;
        },
    });
    const { data: color } = useQuery({
        queryKey: ["COLOR"],
        queryFn: async () => {
            const { data } = await axios.get(
                `https://test-be-phi.vercel.app/api/v1/attributes/663796e17ec34f084a1bf2da`
            );
            return data;
        },
    });
    const selects = Array.from({ length: selectCount }, (_, index) => (
        <div className="my-5 grid grid-cols-2 gap-3">
            <FormField
                control={form.control}
                name={`attributes[${index}].color`}
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Màu:</FormLabel>
                        <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                        >
                            <FormControl>
                                <SelectTrigger>
                                    <SelectValue placeholder="Chọn màu..." />
                                </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                {color?.values?.map((color: any) => {
                                    return (
                                        <SelectItem
                                            value={color._id}
                                            key={color._id}
                                        >
                                            {color.value}
                                        </SelectItem>
                                    );
                                })}
                            </SelectContent>
                        </Select>
                        <FormMessage />
                    </FormItem>
                )}
            />
            {Array.from({ length: sizeCount }, (_, sizeIndex) => (
                <div key={sizeIndex} className="grid grid-cols-2 gap-3">
                    <FormField
                        control={form.control}
                        name={`attributes[${index}].sizes[${sizeIndex}].size`}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Size:</FormLabel>
                                <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                >
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Chọn size..." />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {size?.values?.map((size: any) => {
                                            return (
                                                <SelectItem
                                                    value={size._id}
                                                    key={size._id}
                                                >
                                                    {size.value}
                                                </SelectItem>
                                            );
                                        })}
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name={`attributes[${index}].sizes[${sizeIndex}].quantity`}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel htmlFor={`quantity${sizeIndex}`}>
                                    Số lượng:
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Nhập số lượng..."
                                        {...field}
                                        id={`quantity${sizeIndex}`}
                                        type="number"
                                    ></Input>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
            ))}
        </div>
    ));
    const onHandleSubmit = (product: any) => {
        // Kiểm tra 'image' và 'gallery' trước khi gửi form

        // nếu không có lỗi thì gửi form
        // onSubmit({ ...product, gallery, image });
        console.log({ ...product, gallery, image });
    };

    return (
        <div className=" flex min-h-screen w-[90%] xl:w-full flex-col items-center">
            <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
                <div className="grid flex-1 gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 items-center">
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onHandleSubmit)}
                            className="space-y-8"
                        >
                            <div className="grid grid-cols-2 gap-3">
                                <FormField
                                    control={form.control}
                                    name="category"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Danh mục:</FormLabel>
                                            <Select
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}
                                            >
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Chọn danh mục sản phẩm" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {categories?.map(
                                                        (category: any) => {
                                                            return (
                                                                <SelectItem
                                                                    value={
                                                                        category._id
                                                                    }
                                                                    key={
                                                                        category._id
                                                                    }
                                                                >
                                                                    {
                                                                        category.name
                                                                    }
                                                                </SelectItem>
                                                            );
                                                        }
                                                    )}
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="discount"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel htmlFor="discount">
                                                Giảm giá:
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Nhập giảm giá..."
                                                    {...field}
                                                    id="discount"
                                                ></Input>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                ></FormField>
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel htmlFor="name">
                                                Tên sản phẩm:
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Nhập tên sản phẩm..."
                                                    {...field}
                                                    id="name"
                                                ></Input>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                ></FormField>
                                <FormField
                                    control={form.control}
                                    name="price"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel htmlFor="price">
                                                Giá sản phẩm:
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Nhập giá sản phẩm..."
                                                    {...field}
                                                    id="price"
                                                ></Input>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                ></FormField>
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <FormField
                                    control={form.control}
                                    name="image"
                                    render={() => (
                                        <FormItem>
                                            <FormLabel htmlFor="image">
                                                Ảnh sản phẩm:
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="file"
                                                    id="image"
                                                    onChange={async (e) => {
                                                        const files =
                                                            e.target.files;
                                                        if (!files) return;
                                                        const urls =
                                                            await Promise.all(
                                                                Array.from(
                                                                    files
                                                                ).map(
                                                                    uploadFileCloudinary
                                                                )
                                                            );
                                                        setImage(urls[0]);
                                                        setImagePreview(
                                                            URL.createObjectURL(
                                                                files[0]
                                                            )
                                                        );
                                                        form.setValue(
                                                            "image",
                                                            urls[0]
                                                        );
                                                    }}
                                                ></Input>
                                            </FormControl>
                                            <FormMessage />
                                            {imagePreview && (
                                                <img
                                                    src={imagePreview}
                                                    alt="product"
                                                    className="h-40 object-contain border border-gray-200 rounded-md outline outline-offset-2 outline-gray-200"
                                                />
                                            )}
                                        </FormItem>
                                    )}
                                ></FormField>
                                <FormField
                                    control={form.control}
                                    name="gallery"
                                    render={() => (
                                        <FormItem>
                                            <FormLabel htmlFor="gallery">
                                                Gallery:
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="file"
                                                    multiple
                                                    id="gallery"
                                                    onChange={async (e) => {
                                                        const files =
                                                            e.target.files;
                                                        if (!files) return;
                                                        const urls =
                                                            await Promise.all(
                                                                Array.from(
                                                                    files
                                                                ).map(
                                                                    uploadFileCloudinary
                                                                )
                                                            );
                                                        setGallery(urls);
                                                        setGalleryPreview(
                                                            Array.from(
                                                                files
                                                            ).map((file) =>
                                                                URL.createObjectURL(
                                                                    file
                                                                )
                                                            )
                                                        );
                                                    }}
                                                ></Input>
                                            </FormControl>
                                            <FormMessage />
                                            <div className="grid grid-cols-3 gap-5 justify-items-stretch">
                                                {galleryPreview.map(
                                                    (url, index) => (
                                                        <img
                                                            key={index}
                                                            src={url}
                                                            alt={`product-${index}`}
                                                            className="h-40 object-contain border border-gray-200 rounded-2xl outline outline-offset-2 outline-gray-200 "
                                                        />
                                                    )
                                                )}
                                            </div>
                                        </FormItem>
                                    )}
                                ></FormField>
                            </div>
                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Mô tả:</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder="Nhập mô tả sản phẩm..."
                                                className="resize-none"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="featured"
                                render={({ field }) => (
                                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                                        <FormControl>
                                            <Checkbox
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                            />
                                        </FormControl>
                                        <div className="space-y-1 leading-none">
                                            <FormLabel>
                                                Sản phẩm nổi bật ?
                                            </FormLabel>
                                        </div>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            ></FormField>
                            <div>
                                {selects}
                                <Button
                                    onClick={(event) => {
                                        event.preventDefault();
                                        setSelectCount(selectCount + 1);
                                    }}
                                >
                                    <PlusCircleIcon className="mr-2 h-4 w-4" />{" "}
                                    Thêm thuộc tính
                                </Button>
                                <Button
                                    onClick={(event) => {
                                        event.preventDefault();
                                        setSizeCount(sizeCount + 1);
                                    }}
                                    className="ms-3 float-end"
                                >
                                    <PlusCircleIcon className="mr-2 h-4 w-4" />{" "}
                                    Thêm size
                                </Button>
                            </div>
                            <Button>Thêm sản phẩm</Button>
                        </form>
                    </Form>
                </div>
            </div>
        </div>
    );
};

export default TestAdd;
