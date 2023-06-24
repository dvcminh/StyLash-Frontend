import { useState, Fragment } from "react";
import { Alert, Button } from "@material-tailwind/react";
 
export default function MeassageBox() {
  const [open, setOpen] = useState(true);
 
  return (
    <Fragment>
      {!open && (
        <Button className="absolute" onClick={() => setOpen(true)}>
          Show Alert
        </Button>
      )}
      <Alert
        open={open}
        onClose={() => setOpen(false)}
        animate={{
          mount: { y: 0 },
          unmount: { y: 100 },
        }}
      >
        A dismissible alert with custom animation.
      </Alert>
    </Fragment>
  );
}