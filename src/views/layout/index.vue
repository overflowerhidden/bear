<template>
  <div class="layout">
    <div class="header">
      <div class="icon">
        <img
          src="@/assets/bear.png"
          alt=""
        >
        <span>Little Bear</span>
      </div>
      <div class="info">
        <div v-permission="['admin']">管理员</div>
        <div v-permission="['editor']">普通用户</div>
        <div class="user">{{$store.state.user.token}}</div>
        <div
          class="out"
          @click="out"
        >退出</div>
      </div>
    </div>
    <div class="layoutMenu">
      <Sidebar></Sidebar>
    </div>
    <div class="layoutCont">
      <!-- 路由出口 -->
      <router-view />
    </div>

  </div>
</template>

<script>
import Sidebar from "@/components/Sidebar";

export default {
  name: "layout",
  components: {
    Sidebar,
  },
  mounted() {
    // 获取store状态
    console.log(this.$store.state.user.token);
  },
  methods: {
    out() {
      this.$store
        .dispatch("user/resetToken", {})
        .then(() => {
          this.$router.push({
            path: "/login",
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.layout {
  width: 100%;
  height: 100%;
  overflow: hidden;

  .header {
    width: 100%;
    height: 50px;
    background: #fff;

    .icon {
      width: 300px;
      height: 100%;
      font-size: 25px;
      color: #2b2f3a;
      background: #1abdc1;
      float: left;
      display: flex;
      align-items: center;
      justify-content: center;

      img {
        height: 80%;
        margin-right: 30px;
      }
    }

    .info {
      width: calc(100% - 300px);
      height: 100%;
      box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      div {
        width: 80px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        cursor: pointer;
      }
    }
  }

  .layoutMenu {
    width: 300px;
    height: 100%;
    background: #304156;
    float: left;
  }
  .layoutCont {
    width: calc(100% - 300px);
    height: 100%;
    float: left;
  }
}
</style>