<template lang="pug">
  Editor(v-model="content", :init="editInit", api-key="5f6ulr42vllmdg4b9v9hbvg8dm9vbvup5357vw6i798tvkue")
</template>

<script>
import tinymce from "tinymce/tinymce";
import Editor from "@tinymce/tinymce-vue";
import zh_CN from "../plugins/tinymce/zh_CN";
export default {
  name: "editor",
  data() {
    return {
      content: "",
      editInit: {
        language: "zh_CN",
        language_url: zh_CN,
        height: 400,
        plugins: [
          "advlist autolink link image lists charmap print preview hr anchor pagebreak spellchecker",
          "searchreplace wordcount visualblocks visualchars code fullscreen insertdatetime media nonbreaking",
          "save table contextmenu directionality emoticons template paste textcolor"
        ],
        toolbar:
          "insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image | print preview media fullpage | forecolor backcolor emoticons"
      }
    };
  },
  props: {
    value: {
      type: String,
      default: ""
    }
  },

  created() {
    this.content = this.value;
  },
  components: {
    Editor
  }
};
</script>
