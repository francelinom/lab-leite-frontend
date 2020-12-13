<template>
  <div class="auth-content">
    <div class="auth-modal">
      <img src="@/assets/Logo.png" width="200" alt="Logo" />
      <hr />
      <div class="auth-title"></div>

      <b-input
        id="user-name"
        v-model="userLogin.username"
        type="text"
        placeholder="Nome usuário"
      />
      <b-input
        v-model="userLogin.password"
        type="password"
        placeholder="Senha"
      />

      <button @click="signin">Entrar</button>

      <br />
      <div>
        <b-button v-b-modal.modal-1>Esqueceu a Senha? Recupere Aqui!</b-button>

        <b-modal id="modal-1" ref="modal-1" hide-footer title="Recuperar Senha">
          <b-form>
            <b-input
              id="user-name1"
              v-model="user.username"
              type="text"
              placeholder="Nome usuário"
            />
            <b-input
              id="user-email"
              v-model="user.email"
              type="text"
              placeholder="Email"
            />
          </b-form>
          <div class="modal-footer">
            <b-button @click="hideModal()" @click.prevent="$v.$reset()">
              Cancelar</b-button
            >
            <b-button
              @click="save()"
              @click.prevent="$v.$touch()"
              v-on:click="reset()"
              v-b-modal.modal2
            >
              Recuperar</b-button
            >
          </div>
        </b-modal>

        <b-modal id="modal-2" ref="modal2" hide-footer title="Recuperar Senha">
          <b-form>
            <label>{{ question }}</label>
            <b-input
              id="user-answer"
              v-model="user.answer"
              type="text"
              placeholder="Resposta da pergunta chave"
            />

            <b-input
              id="user-password"
              v-model="user.password"
              type="password"
              required
              placeholder="Nova Senha"
              @change="$v.user.password.$touch()"
              :class="{
                'is-invalid': $v.user.password.$error,
                'is-valid': !$v.user.password.$invalid,
              }"
            />

            <b-input
              id="user-confirm-password"
              v-model="user.repeatPassword"
              type="password"
              required
              placeholder="Confirme a Senha"
              @change="$v.user.repeatPassword.$touch()"
              :class="{
                'is-invalid': $v.user.repeatPassword.$error,
                'is-valid': !$v.user.repeatPassword.$invalid,
              }"
            />
          </b-form>

          <div class="modal-footer">
            <b-button @click="hideModal2()" @click.prevent="$v.$reset()">
              Cancelar</b-button
            >
            <b-button
              @click="save2()"
              @click.prevent="$v.$touch()"
              v-on:click="reset()"
            >
              Alterar senha</b-button
            >
          </div>
        </b-modal>
      </div>
    </div>
  </div>
</template>

<script>
import { baseApiUrl, showError, userKey } from "@/global";
import axios from "axios";
import {
  required,
  maxLength,
  minLength,
  sameAs,
} from "vuelidate/lib/validators";

export default {
  name: "Auth",
  data: function() {
    return {
      showSignup: false,
      user: {
        first_name: "",
        username: "",
        email: "",
        password: "",
        repeatPassword: "",
        answer: "",
      },
      emailSave: "",
      question: "",
      step: false,
      userLogin: {
        username: "",
        password: "",
      },
    };
  },
  validations: {
    user: {
      namesave: "",
      username: {
        required,
      },
      email: {
        required,
      },
      password: {
        required,
        minLength: minLength(8),
        maxLength: maxLength(16),
      },
      repeatPassword: {
        required,
        minLength: minLength(8),
        maxLength: maxLength(16),
        sameAsPassword: sameAs("password"),
      },
    },
  },
  methods: {
    getPayload (token) {
            var payload = token.split('.')[1]
            return JSON.parse(window.atob(payload))
    },
    signin() {
      axios
        .post(`${baseApiUrl}/authenticate/`, this.userLogin)
        .then((res) => {
          localStorage.setItem(userKey, res.data.token);
          this.$store.commit("setUser", this.getPayload(res.data.token));
          this.$router.push({ path: "/" });
        })
        .catch(() => {
          alert("Dados não encontrados");
        });
    },
    signup() {
      axios
        .post(`${baseApiUrl}/signup`, this.userLogin)
        .then(() => {
          this.$toasted.global.defaultSuccess();
          this.$store.commit("setUser", null);
          this.userLogin = {};
          this.showSignup = false;
        })
        .catch(showError);
    },
    save() {
      this.namesave = this.user.username;
      this.emailSave = this.user.email;
      axios
        .post(`${baseApiUrl}/get_question/`, this.user)
        .then((res) => {
          this.$toasted.global.defaultSuccess();
          this.question = res.data.question;
          if (this.question != undefined) this.$refs["modal2"].show();
          this.$v.$reset();
        })
        .catch(() => {
          alert("Dados inválidos");
        });
    },
    save2() {
      this.user.username = this.namesave;
      this.user.email = this.emailSave;
      if (!this.$v.user.$invalid) {
        axios
          .post(`${baseApiUrl}/newpassword/`, this.user)
          .then(() => {
            this.$toasted.global.defaultSuccess();
            this.showSignup = false;
            this.user = {};
            this.hideModal2();
            this.$v.$reset();
          })
          .catch(() => {
            alert("Dados inválidos");
          });
      }
    },
    hideModal() {
      this.$refs["modal-1"].hide();
      this.reset();
    },
    hideModal2() {
      this.$refs["modal2"].hide();
      this.reset();
    },
    reset() {
      this.mode = "save";
      this.user = {};
    },
  },
};
</script>

<style>
.auth-content {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.auth-modal {
  background-color: #fff;
  width: 350px;
  padding: 35px;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.15);

  display: flex;
  flex-direction: column;
  align-items: center;
}

.auth-title {
  font-size: 1.2rem;
  font-weight: 100;
  margin-top: 10px;
  margin-bottom: 15px;
}

.auth-modal input {
  border: 1px solid #bbb;
  width: 100%;
  margin-bottom: 15px;
  padding: 3px 8px;
  outline: none;
}

.auth-modal button {
  align-self: flex-end;
  background-color: #2460ae;
  color: #fff;
  padding: 5px 15px;
}

.auth-modal a {
  margin-top: 35px;
}

.auth-modal hr {
  border: 0;
  width: 100%;
  height: 1px;
  background-image: linear-gradient(
    to right,
    rgba(120, 120, 120, 0),
    rgba(120, 120, 120, 0.75),
    rgba(120, 120, 120, 0)
  );
}
</style>
