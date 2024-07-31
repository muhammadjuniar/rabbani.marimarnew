<template>
  <div class="nk-content p-0">
    <div class="container-fluid">
      <div class="nk-content-inner">
        <div class="nk-content-body">
          <div
            class="wide-xs mx-auto border shadow main-content bg-cover"
            :style="{
              'background-image': `url('${getAssetFile('images/marimar', 'img_background.svg')}')`
            }"
          >
            <div class="card bg-transparent pb-2">
              <div class="card-inner p-0 pt-4 pb-3">
                <div class="nk-block pt-4">
                  <img class="ribbon" src="@/assets/images/marimar/img_ribbon_1.svg" />
                </div>
                <div class="nk-block pt-0">
                  <img class="logo-marimar" src="@/assets/images/marimar/img_logo_marimar.png" />
                </div>
                <div class="nk-block pt-0 relative">
                  <img class="ribbon-2" src="@/assets/images/marimar/img_ribbon_2.png" />
                  <img
                    class="doodle-kiri"
                    width="100px"
                    src="@/assets/images/marimar/img_kurupuk_kiri.png"
                  />
                  <img
                    class="doodle-kanan"
                    width="50px"
                    src="@/assets/images/marimar/img_kurupuk_kanan.png"
                  />
                </div>
                <div class="nk-block pt-0">
                  <img class="marimar" src="@/assets/images/marimar/img_badge_marimar.png" />
                </div>
                <div class="d-flex align-items-center justify-content-center pt-5 mb-4">
                  <router-link
                    :to="{ name: readyAuth ? '2024.profile' : '2024.register' }"
                    class="p-3 btn btn-xl btn-daftar-marimar br-8 shadow align-items-center justify-content-center mb-2"
                    >{{ readyAuth ? 'MEMBER AREA' : 'DAFTAR SEKARANG' }}</router-link
                  >
                </div>
                <div class="nk-block text-center">
                  <div class="p-3"></div>
                  <div class="text-pink-dprd">
                    <p class="fw-bold fs-14px text-white">Pelajari lebih lanjut</p>
                    <em class="icon ni ni-chevrons-down fs-big fw-bold text-white"></em>
                  </div>
                </div>
                <div class="nk-block pt-0">
                  <img class="ribbon" src="@/assets/images/marimar/img_ribbon_3.png" />
                </div>
                <div class="nk-block relative">
                  <div class="video-player">
                    <iframe
                      width="100%"
                      height="230"
                      src="https://www.youtube.com/embed/hf7vviUkRno?si=taGSWIiQ00-SvhgY"
                      title="YouTube video player"
                      frameborder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      referrerpolicy="strict-origin-when-cross-origin"
                      allowfullscreen
                    ></iframe>
                  </div>
                  <img
                    class="doodle-kiri-video"
                    width="100"
                    src="@/assets/images/marimar/img_kurupuk_kiri.png"
                  />
                  <img
                    class="doodle-kanan-video"
                    width="150"
                    src="@/assets/images/marimar/img_kurupuk_kanan.png"
                  />
                </div>
                <div class="nk-block mt-5">
                  <div class="text-title">MARI BU HADROH KEMBALI!!!!</div>
                  <div class="text-paragraph mt-4">
                    <p>
                      Untuk memeriahkan kemerdekaan Indonesia. Rabbani mengadakan kembali kompetisi
                      Qasidah terbaik MARIMAR di Agustus 2024
                    </p>
                    <p>
                      Jangan sampai ketinggalan jangan sampai latihan mulu tapi gak
                      manggung-manggung
                    </p>
                    <p>Daftar sekarang juga! Dapatkan hadiah jutaan rupiah</p>
                    <p>
                      ssttt, baru daftar aja udah dikasih hadiah lohhh, gak percaya? yuk buktiin
                      sekarang
                    </p>
                  </div>
                </div>
                <div class="nk-block total-hadiah">
                  <img class="ribbon" src="@/assets/images/marimar/img_gege.png" alt="..." />
                  <img
                    class="doodle-kiri-gege"
                    width="80"
                    src="@/assets/images/marimar/img_kurupuk_kiri.png"
                  />
                  <img
                    class="doodle-kanan-gege"
                    width="100"
                    src="@/assets/images/marimar/img_kurupuk_kanan.png"
                  />
                </div>
                <div class="nk-block mt-4 text-center">
                  <router-link
                    v-if="fitur_status.register"
                    :to="{ name: '2024.register' }"
                    class="p-3 btn btn-xl btn-daftar-marimar br-8 shadow align-items-center justify-content-center mb-4"
                    >DAFTAR SEKARANG</router-link
                  >
                  <router-link
                    :to="{ name: '2024.profile' }"
                    class="p-3 btn btn-xl btn-marimar br-8 shadow align-items-center justify-content-center mb-4"
                    >MEMBER AREA</router-link
                  >
                  <router-link
                    :to="{ name: '2024.public' }"
                    class="p-3 btn btn-xl btn-marimar br-8 shadow align-items-center justify-content-center mb-4"
                    >VOTE SEKARANG</router-link
                  >
                </div>
              </div>
            </div>
            <Footer :isDetail="true"></Footer>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import session from '@/config/session'
import { getAssetFile, timelineList2024, fiturStatus } from '@/models/attribute'

import Footer from '@/layout/Footer2024'

export default {
  setup() {
    const fitur_status = fiturStatus()
    const readyAuth = session.getters.authenticatedUser
    const winners = []
    const timelines = timelineList2024()

    return { getAssetFile, readyAuth, winners, timelines, fitur_status }
  },
  methods: {},
  components: { Footer },
  name: '2024.home',
  mounted() {
    if (this.$route.meta.title) {
      document.title = this.$route.meta.title
    }
  }
}
</script>
