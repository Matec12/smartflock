import { Fragment, useState } from "react";
import { Combobox, Transition } from "@headlessui/react";
import { Icon } from "@iconify/react";
import { InputGroup, Input, InputGroupAddon, InputGroupText } from "..";
import { clsxm } from "@/lib/utils";

interface SelectProps extends React.ComponentPropsWithRef<"input"> {
  selected: SelectOptions;
  setSelected: (e: SelectOptions) => void;
  handleChange: (e: SelectOptions) => void;
  options: SelectOptions[];
  isLoading?: boolean;
}

const Select = ({
  selected,
  setSelected,
  handleChange,
  options,
  isLoading,
  disabled: buttonDisabled,
  ...rest
}: SelectProps) => {
  const [query, setQuery] = useState("");
  const disabled = isLoading || buttonDisabled;

  const filteredData =
    query === ""
      ? options
      : options.filter((option) =>
          option.label.toLowerCase().includes(query.toLowerCase())
        );

  return (
    <Combobox
      value={selected}
      onChange={(e: SelectOptions) => {
        setSelected(e);
        handleChange(e);
      }}
      defaultValue={options[0]}
      disabled={disabled}
      nullable
    >
      <div className="relative">
        <Combobox.Button merged as={InputGroup}>
          <Combobox.Input
            as={Input}
            autoComplete="off"
            displayValue={(item) => (item as unknown as SelectOptions)?.label}
            onChange={(event) => {
              setQuery(event.target.value);
            }}
            {...rest}
          />
          <InputGroupAddon addonType="append">
            <InputGroupText>
              <Icon
                className={clsxm({ "animate-spin": isLoading })}
                icon={isLoading ? "bx:loader-circle" : "carbon:chevron-sort"}
              />
            </InputGroupText>
          </InputGroupAddon>
        </Combobox.Button>

        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          afterLeave={() => setQuery("")}
        >
          <Combobox.Options className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {filteredData.length === 0 && query !== "" ? (
              <div className="relative cursor-default select-none px-4 py-2 text-gray-700">
                Nothing found.
              </div>
            ) : (
              filteredData.map((option, index) => (
                <Combobox.Option
                  key={index}
                  className="relative cursor-default select-none py-2 pl-10 pr-4 text-gray-900 ui-active:bg-primary ui-active:text-white"
                  value={option}
                >
                  {({ selected }) => {
                    return (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? "font-medium" : "font-normal"
                          }`}
                        >
                          {option?.label}
                        </span>
                        {selected ? (
                          <span
                            className={clsxm(
                              "absolute inset-y-0 left-0 flex items-center pl-3 text-primary"
                              // {
                              //   'text-white bg-primary': active
                              // }
                            )}
                          >
                            <Icon icon="akar-icons:check" />
                          </span>
                        ) : null}
                      </>
                    );
                  }}
                </Combobox.Option>
              ))
            )}
          </Combobox.Options>
        </Transition>
      </div>
    </Combobox>
  );
};

Select.displayName = "Select";

export { Select };
