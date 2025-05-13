import { PencilSquare, Trash } from "@vikrai/icons"
import { HttpTypes } from "@vikrai/types"
import { Container, Heading } from "@vikrai/ui"
import { useTranslation } from "react-i18next"
import { ActionMenu } from "../../../../../components/common/action-menu"
import { useDeleteProductTagAction } from "../../../common/hooks/use-delete-product-tag-action"

type ProductTagGeneralSectionProps = {
  productTag: HttpTypes.AdminProductTag
}

export const ProductTagGeneralSection = ({
  productTag,
}: ProductTagGeneralSectionProps) => {
  const { t } = useTranslation()
  const handleDelete = useDeleteProductTagAction({ productTag })

  return (
    <Container className="flex items-center justify-between">
      <div className="flex items-center gap-x-1.5">
        <span className="text-ui-fg-muted h1-core">#</span>
        <Heading>{productTag.value}</Heading>
      </div>
      <ActionMenu
        groups={[
          {
            actions: [
              {
                icon: <PencilSquare />,
                label: t("actions.edit"),
                to: "edit",
              },
            ],
          },
          {
            actions: [
              {
                icon: <Trash />,
                label: t("actions.delete"),
                onClick: handleDelete,
              },
            ],
          },
        ]}
      />
    </Container>
  )
}

