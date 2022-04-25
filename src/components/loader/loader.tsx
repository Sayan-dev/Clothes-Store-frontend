import { Button, Card, CardActions, CardContent, Modal, Typography } from '@mui/material';
import React, { ReactNode } from 'react'

interface Props{
    text: string;
    open: boolean;
    onCLose?: ()=>void;
    actionButtons?: ReactNode;

}
export default function Loader(props:Props) {
  return (
    <Modal open={props.open} onClose={props.onCLose}>
        <Card>
        <CardContent>
        <Typography variant="body2" color="text.secondary">
          {props.text}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
        </Card>
    </Modal>
  )
}
