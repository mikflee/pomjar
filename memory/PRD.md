# Pom Jar — PRD

## Original Problem Statement
A cozy cabin-in-the-woods task motivation web app. Completing a task adds one pom-pom to a glass mason jar (goal 400). Categories: Joy (golden yellow), Consistency (fern green), Momentum (berry red) shown as colored pom circles. Dark wood background, warm lantern glow, cream/parchment panels, large rustic-serif "Pom Jar" title, mobile-friendly, calm/polished.

## User Choices
- Storage: local storage only (no backend, no auth).
- No completed-tasks list — completing removes the task and adds a pom.
- At 400 poms: jar glows, card "You filled your jar. Your Reward: [reward]", then jar resets to 0 with blank reward and the filled jar is stored on a shelf.
- Title font: cozy rustic serif (Fraunces).

## Architecture
- Fully client-side React (CRA). No backend used. framer-motion for animations, lucide-react icons.
- State in App.js, persisted via `useLocalStorage` hook. Keys: pomjar_tasks, pomjar_drawer, pomjar_poms, pomjar_reward, pomjar_shelf.
- Components: Jar, AddTaskForm, TodayList, TaskDrawer, Celebration, Shelf, PomIcon. Constants in lib/store.js.

## Personas
- A person seeking gentle, visual motivation to complete daily tasks.

## Core Requirements (static)
- Add tasks with category + destination (today/drawer/both).
- Today list: pom icon + name + edit/save-to-drawer/delete/complete; sorted by category then alphabetically; no category text.
- Collapsible Task Drawer grouped by category headings, alphabetical; add-to-today, delete, save-from-today.
- Glass jar packs 400 poms densely bottom-up in stratified color layers (largest category at bottom). Only the new pom animates on completion; jar never bounces.
- 400 → glow + celebration card + reset + shelf.

## Implemented (2026-06)
- Full MVP complete and tested. Testing agent: 14/14 frontend scenarios passed, 100%.

## Backlog
- P2: guard rapid completion within the 400 celebration window with a ref.
- P2: a11y — aria-labels on icon-only buttons, focus restore on celebration close.
- P2: pom count / reward history stats, export data.

## Next Tasks
- Await user feedback / enhancements.
