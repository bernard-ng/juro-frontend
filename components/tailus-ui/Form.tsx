import React from "react";
import { Control, Field, Label, Message, Submit, Root } from "@radix-ui/react-form";
import { type VariantProps, cva } from "class-variance-authority";
import { cn } from 'lib/utils';
import {
    outlinedForm as outlinedTheme,
    softForm as softTheme,
    mixedForm as mixedTheme
} from "@tailus/themer-form";

export type FormFieldVariantProps = VariantProps<typeof formFieldVariants>;
export type FormLabelVariantProps = VariantProps<typeof formLabelVariants>;
export type FormMessageVariantProps = VariantProps<typeof formMessageVariants>;

const inputVariantsMap = {
    soft: softTheme.input,
    outlined: outlinedTheme.input,
    mixed: mixedTheme.input
}

const textareaVariantsMap = {
    soft: softTheme.textarea,
    outlined: outlinedTheme.textarea,
    mixed: mixedTheme.textarea
}

const formFieldVariants = cva('', {
    variants: {
        variant: {
            outlined: outlinedTheme.field,
            soft: softTheme.field,
            mixed : softTheme.field
        },
    }
});

const formLabelVariants = cva('', {
    variants: {
        size: {
            xs: outlinedTheme.label.xs,
            sm: outlinedTheme.label.sm,
            md: outlinedTheme.label.md,
        },
    }
});

const formMessageVariants = cva('', {
    variants: {
        intent: {
            warning: outlinedTheme.message.warning,
            danger: outlinedTheme.message.danger,
            gray: outlinedTheme.message.gray,
        },
    }
});

export interface FormFieldProps extends FormFieldVariantProps {
    className?: string;
}

export interface FormLabelProps {
    className?: string;
    size?: "xs" | "sm" | "md" | "lg";
}

export interface FormMessageProps {
    intent?: "primary" | "secondary" | "accent" | "warning" | "danger" | "gray" | "info" | "success";
    size?: "xs" | "sm" | "md" | "lg";
    className?: string;
}

export interface InputProps
    extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
    variant: "soft" | "outlined" | "mixed";
    size: "xs" | "sm" | "md" | "lg" | "xl";
}

export interface TextAreaProps
    extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'size'> {
    variant: "soft" | "outlined" | "mixed";
    size: "xs" | "sm" | "md" | "lg" | "xl";
}

export const FormRoot = React.forwardRef<
    React.ElementRef<typeof Root>,
    React.ComponentPropsWithoutRef<typeof Root>
>(({ className, ...props }, forwardedRef) => {
    return (
        <Root
            ref={forwardedRef}
            className={cn(className)}
            {...props}
        />
    )
});
FormRoot.displayName = 'FormRoot'

export const FormControl = React.forwardRef<
    HTMLInputElement,
    React.ComponentProps<typeof Control>
>((props, forwardedRef) => (
    <Control
        ref={forwardedRef}
        {...props}
    />
));
FormControl.displayName = 'FormControl'

export const FormField = React.forwardRef<
    React.ElementRef<typeof Field>,
    React.ComponentPropsWithoutRef<typeof Field> & FormFieldProps
>(({ className, variant = "outlined", name, ...props }, forwardedRef) => (
    <Field
        ref={forwardedRef}
        name={name}
        className={cn(formFieldVariants({ variant: variant }), className)}
        {...props}
    />
));
FormField.displayName = 'FormField'

export const FormInput = React.forwardRef<
    HTMLInputElement, InputProps>(({ className, variant="outlined", size="md", ...props }, forwardedRef) => (
    <input
        ref={forwardedRef as React.RefObject<HTMLInputElement>}
        className={cn(inputVariantsMap[variant][size], className)}
        {...props}
    />
));
FormInput.displayName = 'FormInput'

export const FormLabel = React.forwardRef<
    React.ElementRef<typeof Label>,
    React.ComponentPropsWithoutRef<typeof Label> & FormLabelProps
>(({ className, size = "md", ...props }, forwardedRef) => (
    <Label
        ref={forwardedRef}
        className={cn(outlinedTheme.label[size], className)}
        {...props}
    />
));
FormLabel.displayName = 'FormLabel'

export const FormMessage = React.forwardRef<
    React.ElementRef<typeof Message>,
    React.ComponentPropsWithoutRef<typeof Message> & FormMessageProps
>(({ className, intent = "gray", size="sm", match, ...props }, forwardedRef) => (
    <Message
        ref={forwardedRef}
        className={cn(outlinedTheme.message[intent][size], className)}
        match={match}
        {...props}
    />
));
FormMessage.displayName = 'FormMessage'

export const FormSubmit = React.forwardRef<
    HTMLButtonElement,
    React.ComponentProps<typeof Submit>
>((props, forwardedRef) => (
    <Submit
        ref={forwardedRef}
        {...props}
    />
));
FormSubmit.displayName = 'FormSubmit'

export const FormTextArea = React.forwardRef<
    HTMLTextAreaElement, TextAreaProps>(({ className, variant="outlined", size="md", ...props }, forwardedRef) => (
    <textarea
        ref={forwardedRef as React.RefObject<HTMLTextAreaElement>}
        className={cn(textareaVariantsMap[variant][size], className)}
        {...props}
    />
));
FormTextArea.displayName = 'FormTextArea'

const Form = {
    Root: FormRoot,
    Control: FormControl,
    Field: FormField,
    Input: FormInput,
    Label: FormLabel,
    Message: FormMessage,
    Submit: FormSubmit,
    TextArea: FormTextArea,
}

export default Form;
