<template>
  <div class="home">
    <PageTitle icon="fa fa-home" main="Dashboard" sub="Home do Sistema" />
    <div>
      <b-card-group deck>
        <b-card
          bg-variant="success"
          text-variant="black"
          header="Total de itens"
          class="text-center"
        >
          <b-card-text
            >Você possui <b>{{ qtdItems }}</b> itens ativos
            inventário</b-card-text
          >
        </b-card>

        <b-card
          bg-variant="info"
          text-variant="black"
          header="Itens com estoque mínimo"
          class="text-center"
        >
          <b-card-text
            >Você possui <b>{{ qtdItemsMinimum }}</b> itens com estoque
            mínimo</b-card-text
          >
        </b-card>

        <b-card
          bg-variant="warning"
          text-variant="black"
          header="Itens próximos de vencer"
          class="text-center"
        >
          <b-card-text>
            Você possui <b>{{ qtdItemsExpetedNear }}</b> itens próximos de
            vencer
          </b-card-text>
        </b-card>

        <b-card
          bg-variant="secondary"
          text-variant="black"
          header="Itens Vencidos"
          class="text-center"
        >
          <b-card-text
            >Você possui <b>{{ qtdItemsExpeted }}</b> itens vencidos
          </b-card-text>
        </b-card>
      </b-card-group>
    </div>
  </div>
</template>

<script>
import PageTitle from "../template/PageTitle";
import { signIn } from "../../auth/auth";
import axios from "axios";
import { baseApiUrl, userKey } from "@/global";

export default {
  name: "Home",
  components: { PageTitle },
  data() {
    return {
      qtdItems: 0,
      qtdItemsMinimum: 0,
      qtdItemsExpeted: 0,
      qtdItemsExpetedNear: 0,
    };
  },
  methods: {
    async onSubmit() {
      await signIn(this.email, this.password);
      this.$router.push("/");
    },
    loadItems() {
      const url = `${baseApiUrl}/items_total/`;
      axios
        .get(url, {
          headers: {
            Authorization: "JWT " + localStorage.getItem(userKey),
          },
        })
        .then((res) => {
          this.qtdItems = res.data.length;
        });
    },
    loadItemsMinimumStock() {
      const url = `${baseApiUrl}/items_minimum_stock/`;
      axios
        .get(url, {
          headers: {
            Authorization: "JWT " + localStorage.getItem(userKey),
          },
        }).then((res) => {
        this.qtdItemsMinimum = res.data.length;
      });
    },
    loadItemsexpired() {
      const url = `${baseApiUrl}/items_expired/`;
      axios
        .get(url, {
          headers: {
            Authorization: "JWT " + localStorage.getItem(userKey),
          },
        }).then((res) => {
        this.qtdItemsExpeted = res.data.length;
      });
    },
    loadItemsNearExpires() {
      const url = `${baseApiUrl}/items_near_expires/`;
      axios
        .get(url, {
          headers: {
            Authorization: "JWT " + localStorage.getItem(userKey),
          },
        }).then((res) => {
        this.qtdItemsExpetedNear = res.data.length;
      });
    },
    updateTable() {
      this.loadItems();
      this.loadItemsMinimumStock();
      this.loadItemsexpired();
      this.loadItemsNearExpires();
    },
  },
  mounted() {
    this.loadItems();
    this.loadItemsMinimumStock();
    this.loadItemsexpired();
    this.loadItemsNearExpires();
  },
};
</script>
<style></style>
