import { DialogControl } from '@/app/signup/page'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'

type CustomDialogProps = {
  dialogControl: DialogControl
  handleAction: () => void
}

export function CustomDialog({
  dialogControl,
  handleAction,
}: CustomDialogProps) {
  return (
    <AlertDialog open={dialogControl.isSuccess !== null}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{dialogControl.title}</AlertDialogTitle>
          <AlertDialogDescription>
            {dialogControl.description}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction onClick={handleAction}>
            {dialogControl.buttonMessage}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
