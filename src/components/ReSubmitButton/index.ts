import { ElButton } from 'element-plus';
import { ComponentInstance } from 'vue';

function omit(obj: Record<string, any>, fields: string[]) {
  const shallowCopy = { ...obj }
  for (const key of fields) delete shallowCopy[key]
  return shallowCopy
}

type ReSubmitButtonProps = ComponentInstance<typeof ElButton>['$props'] & { debounce?: number }
const ReSubmitButton = defineComponent<ReSubmitButtonProps>({
  name: "ReSubmitButton",
  inheritAttrs: false,
  props: {
    type: {
      default: 'primary'
    },
    debounce: {
      type: Number,
      default: 80
    }
  },

  setup(props, { attrs, slots }) {
    const loading = ref(false);
    async function handleOnClick() {
      if (loading.value) return;

      loading.value = true;
      try {
        const onClick = attrs.onClick as Function;
        await onClick?.();
      } finally {
        useDebounceFn(() => loading.value = false, props.debounce)();
      }
    }

    return () => {
      const buttonProps = {
        ...omit(props, ['debounce']),
        ...omit(attrs, ['onClick']),
        loading: loading.value,
        onClick: () => handleOnClick()
      }
      return h(ElButton, buttonProps, slots.default ? slots.default() : '确 定');
    }
  }
})

export default ReSubmitButton;