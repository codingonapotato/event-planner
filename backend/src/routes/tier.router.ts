import { Router } from 'express';
import * as Tier from '../model/tier.model';

export const tierRouter = Router();

tierRouter.get('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    Tier.getTier(id).then((result) => {
        if (result === - 1) {
            res.status(404).send('Tier not found');
        } else {
            res.status(200).send(result);
        }
    }).catch((err) => {
        res.status(500).send('Database query failed');
    });
});

tierRouter.post('/:id/tier-modify', (req, res) => {
    const id = parseInt(req.params.id);
    Tier.modifyTier(id, req).then((result) => {
        if (result === - 1) {
            res.status(404).send(`Tier with id: ${id} could not be modified :(`);
        } else {
            res.status(200).send(result);
        }
    }).catch((err) => {
        res.status(500).send('Database query failed');
    });
});


tierRouter.put('/tier-create', (req, res) => {
    Tier.createTier(req).then((result) => {
        if (result === - 1) {
            res.status(404).send('Something went wrong with tier creation');
        } else {
            res.status(200).send(result);
        }
    }).catch((err) => {
        res.status(500).send('Database query failed');
    });
});

tierRouter.delete('/:id/tier-remove', (req, res) => {
    const id = parseInt(req.params.id);
    Tier.deleteTier(id).then((result) => {
        if (result === - 1) {
            res.status(404).send('Tier could not be deleted');
        } else {
            res.status(200).send(result);
        }
    }).catch((err) => {
        res.status(500).send('Database query failed');
    });
});

export default tierRouter;