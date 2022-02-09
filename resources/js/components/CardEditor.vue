<template>
  <div>
    <textarea
      class="
        rounded-md
        shadow-card
        py-1
        px-2
        outline-none
        w-full
        text-gray-900
        bg-white
        h-16
        resize-none
      "
      placeholder="Enter a title for this card"
      :value="value"
      ref="card"
      @keyup.esc="closed"
      @keyup.enter="saved"
      @input="$emit('input', $event.target.value)"
    >
    </textarea>
    <div class="flex">
      <button
        class="
          rounded-sm
          py-1
          px-3
          bg-indigo-700
          text-white
          cursor-pointer
          hover:bg-indigo-500
          outline-none
        "
        @click="saved"
      >
        {{ label }}
      </button>
      <button
        class="py-1 px-3 rounded-md hover:bg-gray-400 text-gray-500 ml-1"
        @click="closed"
      >
        Cancel
      </button>
    </div>
  </div>
</template>


<script>
export default {
  props: ["value", "label"],
  mounted() {
    this.$refs.card.focus();;
  },
  methods: {
    closed() {
      this.$emit("closed");
    },
    saved() {
      this.$emit("saved");
    },
  },
};
</script>