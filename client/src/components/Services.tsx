import { SvgIconTypeMap, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { GppGood, Search } from "@mui/icons-material";
import { OverridableComponent } from "@mui/material/OverridableComponent";

function ServiceCard({
  title,
  description,
  Icon,
  bgColor,
}: {
  title: string;
  description: string;
  Icon: OverridableComponent<SvgIconTypeMap<{}, "svg">> & {
    muiName: string;
  };
  bgColor: string;
}) {
  return (
    <Box
      className="white-glassmorphism"
      display="flex"
      gap={2}
      justifyContent="center"
      border="1px solid #a2a2a2"
      m={2}
      p={2}
      maxWidth="600px"
      borderRadius={4}>
      <div
        style={{
          backgroundColor: bgColor,
          alignSelf: "flex-start",
          padding: "7px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "50%",
        }}
        className="">
        <Icon
          style={{
            color: "white",
          }}
        />
      </div>
      <div className="">
        <Typography variant="h6" color="white">
          {title}
        </Typography>
        <Typography variant="body1" color="white">
          {description}
        </Typography>
      </div>
    </Box>
  );
}

function Services() {
  return (
    <Box display={{ lg: "flex" }} padding={"15px 0"}>
      <div>
        <Typography variant="h2" color="white">
          Services that we continue <br /> to improve
        </Typography>
        <Typography variant="body2" color="white">
          We are always looking for new ways to improve our services. If you
          have any suggestions, please let us know.
        </Typography>
      </div>
      <Box padding={"12px 0"}>
        <Typography variant="body1" color="white">
          Let's get started
        </Typography>
        <Box padding={"10px"}>
          <ServiceCard
            title="Security guarentee"
            description="Security is our top priority. We use the latest security technologies to protect your data."
            Icon={GppGood}
            bgColor="#2952E3"
          />
          <ServiceCard
            title="Best exchange rates"
            description="Security is our top priority. We use the latest security technologies to protect your data."
            Icon={Search}
            bgColor="#8945F8"
          />
          <ServiceCard
            title="Fastest transactions"
            description="Security is our top priority. We use the latest security technologies to protect your data."
            Icon={GppGood}
            bgColor="#F84550"
          />
        </Box>
      </Box>
    </Box>
  );
}

export default Services;
