<template>
  <CardEditor
    v-model="title"
    @closed="closed"
    @saved="addCard"
    label="Add Card"
  ></CardEditor>
</template>

<script>
import CardAdd from "../graphql/CardAdd.gql";
import { EVENT_CARD_ADDED } from "../constants";
import CardEditor from "./CardEditor";
import { mapState } from "vuex";
export default {
  components: {
    CardEditor,
  },
  computed: mapState({
    userId: (state) => state.user.id,
  }),

  props: {
    list: Object,
  },

  data() {
    return {
      title: null,
    };
  },
  methods: {
    addCard() {
      const self = this;
      //emit an event
      this.$apollo.mutate({
        mutation: CardAdd,
        variables: {
          title: this.title,
          list_id: this.list.id,
          order: this.list.cards.length + 1,
          ownerId: this.userId,
        },
        update(store, { data: { cardAdd } }) {
          self.$emit("added", {
            store,
            data: cardAdd,
            type: EVENT_CARD_ADDED,
          });
          self.closed();
        },
      });
    },
    closed() {
      this.$emit("closed");
    },
  },
};
</script>