export default function (element, binding) {
  // console.log(binding);

  /* if (binding.arg !== 'position') return;

    Object.keys(binding.modifiers).forEach((position) => {
      element.style[position] = '5px';
    }); */

  Object.keys(binding.value).forEach((position) => {
    element.style[position] = binding.value[position];
  });

  element.style.position = 'absolute';

  // element.style.bottom = '5px';
  // element.style.right = '5px';
}
