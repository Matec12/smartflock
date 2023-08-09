import { Card, CardBody, Paragraph, Badge, Button } from "@/components/UI";
import { BadgeColor, ButtonVariant } from "@/types/types";
import { fDate } from "@/lib/formatTime";
import { Cycle } from "@/api/cycle/types";

interface CycleDetailsCardProps {
  cycle?: Cycle;
  handleUpdateCycleModal: () => void;
}

const CycleDetailsCard = ({
  cycle,
  handleUpdateCycleModal
}: CycleDetailsCardProps) => {
  return (
    <Card className="z-30 my-5 overflow-visible">
      <CardBody>
        <Paragraph className="text-slate-600">Details</Paragraph>
        <div className="mt-5 grid grid-cols-2 gap-3">
          <div className="flex gap-2">
            <Paragraph>Name: </Paragraph>
            <Paragraph>{cycle?.name}</Paragraph>
          </div>
          <div className="flex gap-2">
            <Paragraph>Description: </Paragraph>
            <Paragraph>{cycle?.description}</Paragraph>
          </div>
          <div className="flex gap-2">
            <Paragraph>Bird Type: </Paragraph>
            <Paragraph>{cycle?.birdType?.name}</Paragraph>
          </div>
          <div className="flex gap-2 items-center">
            <Paragraph>Status: </Paragraph>
            <Badge
              color={cycle?.isActive ? BadgeColor.Success : BadgeColor.Danger}
              borderRadius="rounded-md"
            >
              {cycle?.isActive ? "Active" : "Inactive"}
            </Badge>
          </div>
          <div className="flex gap-2">
            <Paragraph>Start Date: </Paragraph>
            <Paragraph>{fDate(cycle?.startDate!)}</Paragraph>
          </div>
          <div className="flex gap-2">
            <Paragraph>End Date: </Paragraph>
            <Paragraph>{fDate(cycle?.endDate!)}</Paragraph>
          </div>
        </div>
        <div className="flex gap-5 justify-center w-full items-center mt-6">
          <Button className="w-1/6" onClick={handleUpdateCycleModal}>
            Edit
          </Button>
          <Button className="w-1/6" variant={ButtonVariant.Danger} ghost>
            End
          </Button>
        </div>
      </CardBody>
    </Card>
  );
};

export { CycleDetailsCard };
