<template>
    <div>
         <v-app id="inspire">
    <v-app id="inspire">
      <v-main>
        <v-container
          class="fill-height"
          fluid
        >
          <v-row
            align="center"
            justify="center"
          >
            <v-col
              cols="12"
              sm="8"
              md="4"
            >
              <v-card class="elevation-12">
                <v-toolbar
                  color="primary"
                  dark
                  flat
                >
                  <v-toolbar-title>Login form</v-toolbar-title>
                  <v-spacer></v-spacer>
                 
                </v-toolbar>
                <v-card-text>
                  <v-form @submit.prevent="login" ref="form">
                    <v-text-field v-model="credencial.email"
                      label="Login"
                      name="login"
                      prepend-icon="mdi-account"
                      type="email"
                      :rules= 'emailRules'
                    ></v-text-field>
  
                    <v-text-field v-model="credencial.password"
                      id="password"
                      label="Password"
                      name="password"
                      prepend-icon="mdi-lock"
                      type="password"
                      :rules= "passwordRules"
                    ></v-text-field>
                    <v-btn color="primary" type= "submit">Login</v-btn>
                  </v-form>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-main>
    </v-app>
  </v-app>
        
    </div>
</template>

<script>
export default {
    name: "loginPage",
    data:()=>{

        return {
            credencial: {email: "", password: ""},
             emailRules: [
        v => !!v || 'E-mail Requerido',
        v => /.+@.+\..+/.test(v) || 'E-mail Invalido',
      ],
       passwordRules: [
        v => !!v || 'contraseña is requerida',
        v => v.length >=4 || 'minimo 4 caracteres',
      ],
      valid: true
        }
    },
    methods: {
        
        async login(){
          
            if(this.$refs.form.validate()){
                console.log(this.credencial)
               try {
                  let {data}=await this.axios.post('auth/login', this.credencial)
                  localStorage.setItem("token", data.access_token);
                     this.$store.commit('settoken',data.access_token);
                     this.axios.defaults.headers.Authorization= 'Bearer '+ data.access_token
                     this.$router.push({name:"Home"})
                  console.log(data)
               } catch (error) {
                   console.log(error)
               }
            }
        }
    }
}
</script>