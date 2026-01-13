"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const tourController = __importStar(require("./tour.controller"));
const router = (0, express_1.Router)();
// Tour Type routes
router.post('/types', async (req, res) => {
    try {
        const tourType = await tourController.createTourType(req.body);
        res.status(201).json({ success: true, data: tourType });
    }
    catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});
router.get('/types', async (req, res) => {
    try {
        const tourTypes = await tourController.getAllTourTypes();
        res.status(200).json({ success: true, data: tourTypes });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});
// Tour routes
router.post('/', async (req, res) => {
    try {
        const tour = await tourController.createTour(req.body);
        res.status(201).json({ success: true, data: tour });
    }
    catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});
router.get('/', async (req, res) => {
    try {
        const { skip = 0, limit = 10 } = req.query;
        const result = await tourController.getAllTours(Number(skip), Number(limit));
        res.status(200).json({ success: true, ...result });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});
router.get('/search', async (req, res) => {
    try {
        const { q, skip = 0, limit = 10 } = req.query;
        if (!q) {
            return res.status(400).json({ success: false, message: 'Search query is required' });
        }
        const result = await tourController.searchTours(String(q), Number(skip), Number(limit));
        res.status(200).json({ success: true, ...result });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});
router.get('/slug/:slug', async (req, res) => {
    try {
        const tour = await tourController.getTourBySlug(req.params.slug);
        res.status(200).json({ success: true, data: tour });
    }
    catch (error) {
        res.status(404).json({ success: false, message: error.message });
    }
});
router.get('/:id', async (req, res) => {
    try {
        const tour = await tourController.getTourById(req.params.id);
        res.status(200).json({ success: true, data: tour });
    }
    catch (error) {
        res.status(404).json({ success: false, message: error.message });
    }
});
router.put('/:id', async (req, res) => {
    try {
        const tour = await tourController.updateTour(req.params.id, req.body);
        res.status(200).json({ success: true, data: tour });
    }
    catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});
router.delete('/:id', async (req, res) => {
    try {
        await tourController.deleteTour(req.params.id);
        res.status(200).json({ success: true, message: 'Tour deleted successfully' });
    }
    catch (error) {
        res.status(404).json({ success: false, message: error.message });
    }
});
exports.default = router;
