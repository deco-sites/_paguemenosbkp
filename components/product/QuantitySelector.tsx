// import Button from "../ui/Button.tsx";

// const QUANTITY_MAX_VALUE = 100;

// // Remove default browser behavior: https://www.w3schools.com/howto/howto_css_hide_arrow_number.asp
// // TODO: Figure out how to add it via tailwind config.
// const innerStyle = `
// input::-webkit-outer-spin-button,
// input::-webkit-inner-spin-button {
//   -webkit-appearance: none;
//   margin: 0;
// }

// input[type="number"] {
//   -moz-appearance: textfield;
// }
// `;

// function QuantitySelector() {
//   const decrement = () => Math.max(0, quantity - 1);

//   const increment = () =>
//     onChange?.(Math.min(quantity + 1, QUANTITY_MAX_VALUE));

//   return (
//     <div class="join border rounded-none">
//       <Button
//         class="btn-square btn-outline border-none join-item"
//         onClick={decrement}
//         disabled={disabled}
//         loading={loading}
//       >
//         -
//       </Button>
//       <input
//         class="input text-center join-item"
//         type="number"
//         inputMode="numeric"
//         pattern="[0-9]*"
//         max={QUANTITY_MAX_VALUE}
//         min={1}
//         value={quantity}
//         disabled={disabled}
//         onBlur={(e) => onChange?.(e.currentTarget.valueAsNumber)}
//       />
//       <Button
//         class="btn-square btn-outline border-none join-item"
//         onClick={increment}
//         disabled={disabled}
//         loading={loading}
//       >
//         +
//       </Button>
//     </div>
//   );
// }

// export default QuantitySelector;
