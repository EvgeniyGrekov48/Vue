<template>
  <div>
    <h1 class="my-title">{{ title }}</h1>
    <table>
      <thead>
      <tr>
        <th class="col-1">№</th>
        <th class="col-2">Имя</th>
        <th class="col-3">Комментарий</th>
        <th class="col-4">Последнее редактирование</th>
        <th class="col-5">Действия</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(note, idx) in notes" :key="note.id">
        <td>{{ idx + 1 }}</td>
        <template v-if="indexEdit !== idx">
          <td>{{ note.name }}</td>
          <td>{{ note.comment }}</td>
        </template>
        <template v-if="indexEdit === idx">
          <td>
            <input type="text" v-model="editNote.name"/>
          </td>
          <td>
            <input type="text" v-model="editNote.comment"/>
          </td>
        </template>
        <td>{{ note.updatedAt }}</td>
        <td>
          <button @click="del(idx)">Удалить</button>
          <button v-show="indexEdit !== idx" @click="edit(idx)">Редактировать</button>
          <button v-show="indexEdit === idx" @click="save(idx)">Сохранить</button>
        </td>
      </tr>
      <tr style="height: 1rem"></tr>
      <p style="width: 60rem; margin: 0.5rem 3.5rem">Для записи, заполните поля ниже и нажмите кнопку "Добавить"</p>
      <tr class="add-note">
        <td>{{ notes.length + 1 }}</td>
        <td>
          <input type="text" v-model="addNote.name" placeholder="Имя"/>
        </td>
        <td>
          <input type="text" v-model="addNote.comment" placeholder="Комментарий"/>
        </td>
        <td></td>
        <td>
          <button @click="add()">Добавить</button>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">

import {defineComponent} from "vue";
import Service from "@/services/Services";
import {emptyNote} from "@/types/Note";
import type Note from "@/types/Note";


export default defineComponent({
  name: "MyTable",
  props: {
    title: String
  },
  data() {
    return {
      notes: [] as Note[],
      addNote: emptyNote(),
      editNote: emptyNote(),
      indexEdit: -1,
    }
  },
  methods: {
    async getAll(): Promise<Note[]> {
      try {
        return await Service.getAll()
      } catch (e) {
        console.error('Get data error', e)
        alert('Не удалось получить данные с сервера')
        return []
      }
    },

    async del(idx: number): Promise<void> {
      const noteName = this.notes[idx].name || 'поле не заполнено'
      const promptMsg = `Вы действительно хотите удалить запись №${idx + 1} c именем "${noteName}"`
      if (!confirm(promptMsg)) return
      try {
        await Service.delete(this.notes[idx].id!)
        this.notes.splice(idx, 1)
      } catch (e) {
        console.error('Delete data error', e)
        alert('Не удалось удалить запись на сервере')
      }
    },

    async add(): Promise<void> {
      try {
        const toAdd = await Service.add(this.addNote)
        this.notes.push(toAdd)
        this.addNote = emptyNote()
      } catch (e) {
        console.error('Add data error', e)
        alert('Не удалось добавить запись на сервер')
      }
    },

    edit(idx: number): void {
      this.indexEdit = idx
      this.editNote = {name: this.notes[idx].name, comment: this.notes[idx].comment}
    },

    async save(idx: number): Promise<void> {
      try {
        const note = this.notes[idx]
        const updateData = {id: note.id, name: this.editNote.name, comment: this.editNote.comment}
        this.notes[idx] = await Service.update(updateData)
        this.indexEdit = -1
      } catch (e) {
        console.error('Update data error', e)
        alert('Не удалось изменить запись на сервере')
      }
    },

  },
  async mounted() {
    this.notes = await this.getAll();
  }
})
</script>

<style scoped lang="scss">
.my-title {
  margin-left: 3.5rem;
}

table {
  table-layout: fixed;
  width: 100%;
  border-collapse: collapse;
}

th, td {
  border: 1px solid gray;
}

td {
  padding: 0 4px;
  text-align: center;
  overflow-wrap: break-word;

  input {
    box-sizing: border-box;
    width: 100%;
  }
}

button {
  width: 7rem;
  margin: 0.25rem;
}

.col-1 {
  width: 3rem;
}

.col-2 {
  width: auto;
}

.col-3 {
  width: auto;
}

.col-4 {
  width: 9rem;
}

.col-5 {
  width: 16rem;
}

.add-note {
  th, td {
    background: hsl(0, 0%, 100%);
  }
}

</style>
