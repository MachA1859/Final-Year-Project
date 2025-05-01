"use client";

import * as React from "react";
import * as Select from "@radix-ui/react-select";

const ChevronDown = () => (
  <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 6H11L7.5 10.5L4 6Z" fill="currentColor"/>
  </svg>
);

const Check = () => (
  <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M11.4669 3.72684C11.7558 3.91574 11.8369 4.30308 11.648 4.59198L7.39799 11.092C7.29783 11.2452 7.13556 11.3467 6.95402 11.3699C6.77247 11.3931 6.58989 11.3355 6.45446 11.2124L3.70446 8.71241C3.44905 8.48022 3.43023 8.08494 3.66242 7.82953C3.89461 7.57412 4.28989 7.55529 4.5453 7.78749L6.75292 9.79441L10.6018 3.90792C10.7907 3.61902 11.178 3.53795 11.4669 3.72684Z" fill="currentColor"/>
  </svg>
);

interface Account {
  id: string;
  name: string;
  bankName: string;
}

interface BankDropdownProps {
  accounts: Account[];
  setValue?: (field: string, value: string) => void;
  otherStyles?: string;
}

const BankDropdown = ({ accounts, setValue, otherStyles }: BankDropdownProps) => {
  const [value, setValueState] = React.useState("");

  React.useEffect(() => {
    if (value) {
      setValue?.("senderBank", value);
    }
  }, [value, setValue]);

  return (
    <Select.Root value={value} onValueChange={setValueState}>
      <Select.Trigger
        className={`bank-dropdown ${otherStyles || ''}`}
      >
        <Select.Value placeholder="Select a bank to transfer funds from" />
        <Select.Icon className="text-gray-900 dark:text-[#F1F1F1]">
          <ChevronDown />
        </Select.Icon>
      </Select.Trigger>
      <Select.Portal>
        <Select.Content className="bank-dropdown-content">
          <Select.Viewport className="p-[5px]">
            {accounts.map((account) => (
              <SelectItem key={account.id} value={account.id}>
                <div className="flex flex-col">
                  <p className="text-16 font-medium dark:text-[#F1F1F1]">{account.name}</p>
                  <p className="text-14 text-gray-600 dark:text-[#E0E0E0]">{account.bankName}</p>
                </div>
              </SelectItem>
            ))}
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
};

interface SelectItemProps extends React.ComponentPropsWithoutRef<typeof Select.Item> {
  children: React.ReactNode;
  className?: string;
}

const SelectItem = React.forwardRef<HTMLDivElement, SelectItemProps>(
  ({ children, className, ...props }, forwardedRef) => {
    return (
      <Select.Item
        className={`bank-dropdown-item ${className || ''}`}
        {...props}
        ref={forwardedRef}
      >
        <Select.ItemText>{children}</Select.ItemText>
        <Select.ItemIndicator className="absolute left-0 inline-flex w-[25px] items-center justify-center">
          <Check />
        </Select.ItemIndicator>
      </Select.Item>
    );
  }
);

export default BankDropdown; 