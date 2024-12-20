import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */
const sidebars: SidebarsConfig = {
  // By default, Docusaurus generates a sidebar from the docs folder structure
  Sidebar: [
    // Your custom HTML link
    {
      type: 'html',
      value: '<a href="https://dev.onthewifi.com/" target="_self" style="text-decoration: none; color: inherit;">DNA Home</a>', // The HTML to be rendered
      defaultStyle: true, // Use the default menu item styling
    },
    {
      type: 'autogenerated',
      dirName: '.', // Autogenerate links for this directory
    },
  ],
};


export default sidebars;
