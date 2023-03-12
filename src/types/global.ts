import { computed, ref } from 'vue'
export const StatusOptions = ref<any[]>([
    {
        label: "禁用",
        value: 0,
        other: "orange",
    },
    {
        label: "正常",
        value: 1,
        other: "green",
    },
]);