'use client'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

export function AlertDialogDemo({elim, handleDelete, element , deleteProd}) {
  console.log(element);
  

  return (
    <AlertDialog open={elim}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Estas totalmente seguro?</AlertDialogTitle>
          <AlertDialogDescription>
            Esta acción no puede ser deshecha. Esto eliminará permanentemente el elemento.
            Desea Continuar?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={handleDelete}>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={(e)=>{deleteProd(element);handleDelete(e)}}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
