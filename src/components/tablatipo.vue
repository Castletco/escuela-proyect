<template>
  <v-data-table
    :headers="encabezado"
    :items="datostabla"
    :search="search"
    sort-by="calories"
    class="elevation-4"
  >
    <template v-slot:top>
      <v-toolbar
        flat
      >
        <v-toolbar-title>{{tablename}}
            
        </v-toolbar-title>
        
        <v-spacer></v-spacer>
        <v-text-field
            class="mr-10"
            v-model="search"
            append-icon="mdi-magnify"
            label="Buscar por año"
            single-line
            hide-details
         ></v-text-field> 
         <v-btn
              color="primary"
              dark
              class="mb-2"
              @click="passdata"
            >
            <v-icon>mdi-plus</v-icon>
              Nuevo año academico
            </v-btn>
        <v-dialog
          persistent
          v-model="dialog"
          max-width="500px"
        >
        
          <!-- <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="primary"
              dark
              class="mb-2"
              v-bind="attrs"
              v-on="on"
            >
            <v-icon>mdi-plus</v-icon>
              Agregar
            </v-btn>
          </template> -->
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col
                    cols="12"
                    sm="12"
                    md="12"
                  >
                    <v-text-field
                    dense
                      outlined
                      v-model="nuevaasignatura.nombre_asignatura"
                      label="NOMBRE ASIGNATURA"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="12"
                    md="12"
                  >
                    <v-text-field
                      dense
                      outlined
                     
                      label="NIVEL-ASSOCIADO"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="6"
                  >
                    <v-text-field
                      dense
                      outlined
                      v-model="nuevaasignatura.codigo_asignatura"
                      label="CODIGO-MINEDUC"
                    ></v-text-field>
                  </v-col>
                 
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="blue darken-1"
                text
                @click="close"
              >
                Cancel
              </v-btn>
              <v-btn
                color="blue darken-1"
                text
                @click="save"
              >
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="headline">Are you sure you want to delete this item?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
       <v-icon
       class="mr-2"
        small
        @click="deleteItem(item)"
      >
        mdi-eye
      </v-icon>
      <v-icon
        small
        class="mr-2"
        @click="editItem(item)"
      >
        mdi-pencil
      </v-icon>
      <v-icon
        small
        @click="deleteItem(item)"
      >
        mdi-delete
      </v-icon>
    </template>
    
  </v-data-table>
</template>

<script>
import axios from 'axios'
export default {
    name: "tabla-tipo",
    props:{
      tablename:String,
      encabezado:Array,
      datostabla:Array

    },
     data() {
        return {
          nuevaasignatura:{
            nombre_asignatura:"",
            codigo_asignatura:""
          },
            search:"",
            dialog: false,
            dialogDelete: false,
            headers:[
                {text:'nombre', value: 'nombre'},
                {text:'nivel-asoc', value:'nivel_asoc'},
                {text:'codigo', value: 'codigo'},
                {text:'acciones', value: 'actions'}
            ],
            items:[
                {nombre: 'castellano', codigo: 'cas001', nivel_asoc: '1°medio'},
                {nombre: 'Matematica', codigo: 'mat001', nivel_asoc: '1°medio'},
                {nombre: 'Historia', codigo: 'his001', nivel_asoc: '1°medio'},
                {nombre: 'Tecnologia', codigo: 'tec001', nivel_asoc: '1°medio'},
            ],
            desserts: [],
            editedIndex: -1,
            editedItem: {
                nombre: '',
                nivel_asoc: '',
                codigo: '',
                carbs: 0,
                protein: 0,
            },
            defaultItem: {
                name: '',
                calories: 0,
                fat: 0,
                carbs: 0,
                protein: 0,
            },
            
        }
    },
    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'CREAR NUEVA ASIGNATURA' : 'EDITAR ASIGNATURA'
      },
    },
    methods: {
        passdata (event){
          this.$emit("abrirDialog1", true)
        },
        deleteItem (item) {
        this.editedIndex = this.datostabla.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true
      },
         editItem (item) {
        this.editedIndex = this.items.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      close () {
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      closeDelete () {
        this.dialogDelete = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },
      deleteItemConfirm () {
        this.datostabla.splice(this.editedIndex, 1)
        this.closeDelete()
      },
      save () {
        axios.post('http://localhost:3000/api/asignaturas', this.nuevaasignatura)
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
      },
    },
}
</script>