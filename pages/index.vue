<script setup lang="ts">
import { menu, categories } from '~/data/menu'

const { currentUser } = useAuth()
const { add } = useCart()
const activeCategory = ref<typeof categories[number]>('Burgers')

const filtered = computed(() => menu.filter((m) => m.category === activeCategory.value))
const featured = computed(() => menu.filter((m) => m.tag === 'Signature'))
const spotlight = menu.find((m) => m.id === 'b1')!

const spotlightAdded = ref(false)
function addSpotlight() {
  add(spotlight)
  spotlightAdded.value = true
  setTimeout(() => (spotlightAdded.value = false), 900)
}

const testimonials = [
  {
    quote: 'The Char Classic is the best smash burger I have had outside of a proper diner. The char is real, not just a name.',
    name: 'Sara M.',
    role: 'Regular, 3 years'
  },
  {
    quote: 'Ordered the Pepperoni Char-Edge three times this month already. The crust holds up even after delivery.',
    name: 'Hamza R.',
    role: 'Verified order'
  },
  {
    quote: 'Green Garden Stack finally makes me feel like the veg option is not an afterthought. Genuinely craveable.',
    name: 'Leah D.',
    role: 'Verified order'
  }
]
</script>

<template>
  <div>
    <!-- Hero -->
    <section class="relative overflow-hidden bg-charcoal text-paper">
      <div class="absolute inset-0 bg-grain"></div>
      <div class="relative mx-auto max-w-6xl px-5 sm:px-8 pt-14 pb-16 sm:pt-20 sm:pb-20 grid lg:grid-cols-[1.15fr_1fr] gap-12 items-center">
        <div>
          <span class="eyebrow text-ember">Welcome back, {{ currentUser?.name.split(' ')[0] }}</span>
          <h1 class="font-display font-extrabold text-5xl sm:text-6xl lg:text-7xl leading-[1.05] mt-5 [text-wrap:balance]">
            Cooked over open <span class="text-flame">flame.</span>
          </h1>
          <p class="font-accent italic text-paper/70 text-lg sm:text-xl max-w-md mt-6 leading-relaxed">
            Smash-pressed burgers and wood-fired pizza, char-marked to order.
          </p>
          <div class="flex flex-wrap items-center gap-4 mt-9">
            <a href="#menu" class="btn-primary">View the menu</a>
            <div class="flex items-center gap-2 text-sm text-paper/70">
              <StarRating :rating="4.8" />
              <span>from 6,200+ orders</span>
            </div>
          </div>
        </div>

        <!-- Spotlight product card -->
        <div class="bg-paper text-charcoal rounded-2xl p-6 shadow-2xl">
          <div class="flex items-center justify-between mb-4">
            <span class="eyebrow">Today's pick</span>
            <span class="bg-flame text-paper text-[10px] font-mono font-semibold uppercase tracking-widest2 px-2.5 py-1 rounded-full">Signature</span>
          </div>
          <div class="bg-[#F1ECDF] rounded-xl h-44 flex items-center justify-center mb-4">
            <img :src="spotlight.image" :alt="spotlight.name" class="h-32 w-32 object-contain" />
          </div>
          <div class="flex items-start justify-between gap-3 mb-1.5">
            <h2 class="font-display font-bold text-2xl tracking-tight">{{ spotlight.name }}</h2>
            <span class="font-mono font-semibold text-lg shrink-0">${{ spotlight.price.toFixed(2) }}</span>
          </div>
          <StarRating :rating="spotlight.rating" :reviews="spotlight.reviews" class="mb-3" />
          <p class="text-sm text-charcoal/60 leading-relaxed mb-5">{{ spotlight.desc }}</p>
          <button
            class="w-full rounded-lg py-3 text-sm font-semibold uppercase tracking-wide font-mono transition-colors"
            :class="spotlightAdded ? 'bg-basil text-paper' : 'bg-charcoal text-paper hover:bg-flame'"
            @click="addSpotlight"
          >
            {{ spotlightAdded ? 'Added to ticket' : 'Add to ticket' }}
          </button>
        </div>
      </div>
    </section>

    <!-- Trust bar -->
    <section class="border-b border-charcoal/10 bg-paper">
      <div class="mx-auto max-w-6xl px-5 sm:px-8 py-8 grid grid-cols-2 sm:grid-cols-4 gap-6 text-center sm:text-left">
        <div>
          <p class="font-display font-extrabold text-3xl">4.8</p>
          <p class="text-xs text-smoke font-mono uppercase tracking-widest2 mt-1">Average rating</p>
        </div>
        <div>
          <p class="font-display font-extrabold text-3xl">25k+</p>
          <p class="text-xs text-smoke font-mono uppercase tracking-widest2 mt-1">Orders served</p>
        </div>
        <div>
          <p class="font-display font-extrabold text-3xl">18 min</p>
          <p class="text-xs text-smoke font-mono uppercase tracking-widest2 mt-1">Avg. kitchen time</p>
        </div>
        <div>
          <p class="font-display font-extrabold text-3xl">3</p>
          <p class="text-xs text-smoke font-mono uppercase tracking-widest2 mt-1">City locations</p>
        </div>
      </div>
    </section>

    <!-- Featured strip -->
    <section class="mx-auto max-w-6xl px-5 sm:px-8 py-14 sm:py-16">
      <span class="eyebrow">Fan favourites</span>
      <h2 class="font-display font-extrabold text-3xl sm:text-4xl mt-2 mb-8">Where to start</h2>
      <div class="grid sm:grid-cols-3 gap-6">
        <MenuCard v-for="item in featured" :key="item.id" :item="item" />
      </div>
    </section>

    <!-- Category strip -->
    <section id="menu" class="sticky top-[116px] z-30 bg-paper/95 backdrop-blur border-y border-charcoal/10">
      <div class="mx-auto max-w-6xl px-5 sm:px-8 flex gap-8 overflow-x-auto py-5 font-mono text-xs uppercase tracking-widest2">
        <button
          v-for="cat in categories"
          :key="cat"
          class="whitespace-nowrap pb-1 border-b-2 transition-colors"
          :class="activeCategory === cat ? 'border-flame text-flame' : 'border-transparent text-charcoal/50 hover:text-charcoal'"
          @click="activeCategory = cat"
        >
          {{ cat }}
        </button>
      </div>
    </section>

    <!-- Menu grid -->
    <section class="mx-auto max-w-6xl px-5 sm:px-8 py-14 sm:py-20">
      <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <MenuCard v-for="item in filtered" :key="item.id" :item="item" />
      </div>
    </section>

    <!-- Signature strip -->
    <section class="bg-charcoal text-paper py-16">
      <div class="mx-auto max-w-6xl px-5 sm:px-8 grid sm:grid-cols-3 gap-10">
        <div>
          <span class="font-display font-extrabold text-4xl text-flame">01</span>
          <p class="font-semibold mt-3 mb-2">Fire first</p>
          <p class="text-sm text-paper/60 leading-relaxed">Every patty and pie touches open flame before it touches a plate.</p>
        </div>
        <div>
          <span class="font-display font-extrabold text-4xl text-flame">02</span>
          <p class="font-semibold mt-3 mb-2">Made to ticket</p>
          <p class="text-sm text-paper/60 leading-relaxed">Nothing is pre-made. Your order goes straight to the grill the moment you send it.</p>
        </div>
        <div>
          <span class="font-display font-extrabold text-4xl text-flame">03</span>
          <p class="font-semibold mt-3 mb-2">Local, mostly</p>
          <p class="text-sm text-paper/60 leading-relaxed">Produce sourced from growers within a day's drive, whenever we can.</p>
        </div>
      </div>
    </section>

    <!-- Testimonials -->
    <section class="mx-auto max-w-6xl px-5 sm:px-8 py-16 sm:py-20">
      <span class="eyebrow">What people order again</span>
      <h2 class="font-display font-extrabold text-3xl sm:text-4xl mt-2 mb-10">Straight from the tickets</h2>
      <div class="grid sm:grid-cols-3 gap-6">
        <div v-for="t in testimonials" :key="t.name" class="ticket p-6 flex flex-col">
          <StarRating :rating="5" class="mb-4" />
          <p class="font-accent italic text-charcoal/80 leading-relaxed flex-1">&ldquo;{{ t.quote }}&rdquo;</p>
          <div class="mt-5 pt-4 border-t border-charcoal/10">
            <p class="font-semibold text-sm">{{ t.name }}</p>
            <p class="text-xs text-smoke">{{ t.role }}</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
