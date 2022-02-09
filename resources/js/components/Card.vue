<template>
  <div>
    <div
      v-if="!editing"
      class="
        bg-white
        rounded-sm
        p-2
        shadow-card
        cursor-pointer
        text
        hover:bg-gray-100
        mb-2
        flex
        justify-between
        group
      "
    >
      <div>
        {{ card.title }}
      </div>
      <div
        class="
          flex
          font-bold
          opacity-0
          group-hover:opacity-100
          transition-opacity
          ease-out
          duration-500
        "
        v-if="card.owner.id == userId"
      >
        <div
          class="text-gray-400 pr-2 hover:text-yellow-700"
          @click="editing = true"
        >
          Edit
        </div>
        <div class="text-gray-400 hover:text-red-800" @click="cardDelete">
          Del
        </div>
      </div>
    </div>
    <CardEditor
      v-model="title"
      v-else
      class="mb-2"
      label="Update Card"
      @closed="editing=false"
      @saved="cardUpdate"
    ></CardEditor>
  </div>
</template>

<script>
import CardDelete from "../graphql/CardDelete.gql";
import CardEditor from "./CardEditor.vue";
import CardUpdate from "../graphql/CardUpdate.gql";
import { EVENT_CARD_DELETED, EVENT_CARD_UPDATED } from "../constants";
import {mapState} from 'vuex';
export default {
  components: {
    CardEditor,
  },
  props: {
    card: Object,
  },
  computed: mapState({
    userId: state => state.user.id
  }),
  data() {
    return {
      editing: false,
      title: this.card.title,
    };
  },
  methods: {
   async cardDelete() {
      const self = this;
      try {
       await this.$apollo.mutate({
        mutation: CardDelete,
        variables: {
          id: this.card.id,
        },
        update(store, { data: { cardDelete } }) {
          self.$emit("deleted", {
            store,
            data: cardDelete,
            type: EVENT_CARD_DELETED,
          });
        },
      }); 
      } catch (err) {
        
      }
    },

  async  cardUpdate() {
      const self = this;
     try {
       await this.$apollo.mutate({
        mutation: CardUpdate,
        variables: {
          id: this.card.id,
          title: this.title,
        },
        update(store, {data : cardUpdate}){
            self.$emit("updated",{
                store,
                data: cardUpdate,
                type: EVENT_CARD_UPDATED
            });
            self.editing = false
        }
      });
     } catch (err) {
       
     }
    },
  },
};
</script>

<style scoped>
</style>
