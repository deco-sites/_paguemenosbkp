import { useSignal } from "@preact/signals";
import Button from "$store/components/ui/Button.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import {
  Options as UseAddToCartProps,
  useAddToCart,
} from "$store/sdk/useAddToCart.ts";

interface Props extends UseAddToCartProps {
  /**
   * @description Product id
   */
  sellerId: string;
}

function AddToCartButton(
  { skuId, sellerId, discount, price, productGroupId, name }: Props,
) {
  const quantity = useSignal(1);

  const props = useAddToCart({
    skuId,
    sellerId,
    discount,
    price,
    productGroupId,
    name,
  });

  const QUANTITY_MAX_VALUE = 100;

  return (
    <div class="flex flex-row">
      <div class="join border border-gray-500 rounded-full">
        <Button
          class={`btn-md bg-white border-none join-item rounded-l-full ${
            quantity.value > 1 && "text-[#0054A6]"
          } hover:bg-white`}
          onClick={() => quantity.value > 1 ? quantity.value -= 1 : 0}
        >
          -
        </Button>
        <input
          class="input text-center join-item px-0 w-9"
          type="number"
          inputMode="numeric"
          pattern="[0-9]*"
          value={quantity.value}
          max={QUANTITY_MAX_VALUE}
          min={1}
          // onBlur={(e) => onChange?.(e.currentTarget.valueAsNumber)}
        />
        <Button
          class={`btn-md bg-white border-none join-item rounded-r-full ${
            quantity.value < 100 && "text-[#0054A6]"
          } hover:bg-white`}
          onClick={() =>
            QUANTITY_MAX_VALUE > quantity.value ? quantity.value += 1 : 0}
        >
          +
        </Button>
      </div>
      <Button
        data-deco="add-to-cart"
        {...props}
        onClick={(e) => props?.onClick(e, quantity.value)}
        class="bg-[#007dc5] rounded-r-full rounded-l-full px-10 ml-3"
      >
        <Icon id="cart" width={30} height={30} />
        Adicionar
      </Button>
    </div>
  );
}

export default AddToCartButton;
