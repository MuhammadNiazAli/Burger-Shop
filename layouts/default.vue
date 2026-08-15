<template>
  <div class="min-h-screen flex flex-col bg-paper bg-grain">
    <TheNavbar />
    <main class="flex-1">
      <slot />
    </main>
    <TheFooter />
  </div>
</template>
