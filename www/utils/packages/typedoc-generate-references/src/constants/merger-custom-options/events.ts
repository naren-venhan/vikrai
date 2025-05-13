import { FormattingOptionsType } from "types"

const eventsOptions: FormattingOptionsType = {
  "^modules/events/": {
    reflectionDescription: `This documentation page includes the list of all events emitted by [vikrai's workflows](https://docs.vikrai.com/resources/vikrai-workflows-reference).`,
    frontmatterData: {
      slug: "/references/events",
      sidebar_label: "Events Reference",
    },
    isEventsReference: true,
    reflectionTitle: {
      fullReplacement: "Events Reference",
    },
  },
  "^module_events": {
    expandMembers: true,
    isEventsReference: true,
    reflectionDescription: `This reference shows all the events emitted by the vikrai application related to the {{alias}} Module. If you use the module outside the vikrai application, these events aren't emitted.`,
    reflectionTitle: {
      suffix: "Module Events Reference",
    },
    frontmatterData: {
      slug: "/references/{{alias-slug}}/events",
      sidebar_label: "Events Reference",
    },
  },
}

export default eventsOptions

